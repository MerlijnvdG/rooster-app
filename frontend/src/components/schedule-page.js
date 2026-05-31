import { LitElement, html, css } from 'lit';
import { ChevronLeft, ChevronRight, PlusIcon } from '../icons.js';
import { getLocations, getShiftsByLocation, getAllEmployees, createShift, updateShift, deleteShift } from '../api.js';
import { getWeekDays, toISO, addDays, getMonday, formatWeekShort, getWeekNumber, employeeColor, diffHours } from '../date-utils.js';
import { base } from '../ui.js';
import { hourRange, barPos, ruler, shortDate, timelineStyles } from '../timeline.js';
import './shift-modal.js';
import './confirm-modal.js';

class SchedulePage extends LitElement {
  static properties = {
    _locations:        { state: true },
    _activeLocationId: { state: true },
    _weekOffset:       { state: true },
    _shifts:           { state: true },
    _employees:        { state: true },
    _modalOpen:        { state: true },
    _editShift:        { state: true },
    _loading:          { state: true },
    _error:            { state: true },
    _confirmModal:     { state: true },
  };

  static styles = [base, timelineStyles, css`
    .weeknav { display: flex; align-items: center; gap: 0.25rem; }
    .weeknav .btn { padding: 0.45rem 0.6rem; }

    .tabs { display: flex; gap: 1.25rem; box-shadow: inset 0 -1px 0 var(--app-border); margin-bottom: 1rem; overflow-x: auto; }
    .tab {
      font: inherit; font-size: 0.92rem; background: none; border: none; cursor: pointer;
      color: var(--app-text-muted); padding: 0.5rem 0; border-bottom: 2px solid transparent;
      white-space: nowrap;
    }
    .tab:hover { color: var(--app-text-dark); }
    .tab.active { color: var(--app-text-dark); font-weight: 700; border-bottom-color: var(--app-accent); }

    .summary { font-size: 0.85rem; color: var(--app-text-muted); margin-bottom: 0.6rem; }
    .summary b { color: var(--app-text-dark); font-family: var(--font-mono); font-weight: 600; }

    .tl-count { font-size: 0.75rem; color: var(--app-text-muted); }

    @media (max-width: 600px) {
      .page-head .actions { width: 100%; justify-content: space-between; }
      .tl-count { margin-left: auto; }
    }
  `];

  constructor() {
    super();
    this._locations = []; this._activeLocationId = null;
    this._weekOffset = 0; this._shifts = []; this._employees = [];
    this._modalOpen = false; this._editShift = null;
    this._loading = true; this._error = '';
    this._confirmModal = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      this._locations = await getLocations();
      this._activeLocationId = this._locations[0]?.id;
      await this._loadData();
    } catch {
      this._error = 'Filialen konden niet geladen worden.';
      this._loading = false;
    }
  }

  async _loadData() {
    if (!this._activeLocationId) { this._loading = false; return; }
    this._loading = true; this._error = '';
    try {
      const mon = getMonday(this._weekOffset);
      const sun = addDays(mon, 6);
      [this._shifts, this._employees] = await Promise.all([
        getShiftsByLocation(this._activeLocationId, toISO(mon), toISO(sun)),
        getAllEmployees(),
      ]);
    } catch { this._error = 'Het rooster kon niet geladen worden.'; }
    finally { this._loading = false; }
  }

  _setLocation(id) { this._activeLocationId = id; this._loadData(); }
  _prevWeek()      { this._weekOffset--; this._loadData(); }
  _nextWeek()      { this._weekOffset++; this._loadData(); }
  _thisWeek()      { this._weekOffset = 0; this._loadData(); }

  // datum alvast invullen als je bij een dag op + drukt
  _openAdd(date = null) {
    this._editShift = date ? { date } : null;
    this._modalOpen = true;
  }

  _openEdit(shift) { this._editShift = { ...shift }; this._modalOpen = true; }
  _closeModal()    { this._modalOpen = false; this._editShift = null; }

  async _handleSave({ detail: { id, data } }) {
    try {
      if (id) await updateShift(id, data); else await createShift(data);
      this._closeModal();
      await this._loadData();
    } catch (e) { this._error = e.message || 'Opslaan is niet gelukt.'; }
  }

  _handleDelete({ detail: { id } }) {
    this._closeModal();
    this._confirmModal = {
      title: 'Dienst verwijderen?',
      message: 'De dienst verdwijnt ook uit het rooster van de medewerker.',
      onConfirm: async () => {
        this._confirmModal = null;
        try { await deleteShift(id); await this._loadData(); }
        catch { this._error = 'Verwijderen is niet gelukt.'; }
      },
    };
  }

  _renderWeek() {
    const days = getWeekDays(this._weekOffset);
    const range = hourRange(this._shifts);
    const cols = `background-size:${100 / (range.to - range.from)}% 100%`;
    const today = toISO(new Date());

    return html`
      <div class="tl">
        <div class="tl-head">
          <div class="tl-day"></div>
          <div class="tl-track" style=${cols}>${ruler(range)}</div>
          <div></div>
        </div>
        ${days.map(({ iso, dayFull, date }) => {
          const dayShifts = this._shifts.filter(s => s.date === iso)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
          const closed = date.getDay() === 0;
          return html`
            <div class="tl-row ${iso === today ? 'today' : ''} ${closed ? 'closed' : ''}">
              <div class="tl-day">
                <span class="tl-dayname">${dayFull}</span>
                <span class="tl-date">${iso === today ? 'vandaag, ' : ''}${shortDate(date)}</span>
                ${dayShifts.length ? html`<span class="tl-count">${dayShifts.length} ${dayShifts.length === 1 ? 'dienst' : 'diensten'}</span>` : ''}
              </div>
              <div class="tl-track" style=${closed ? '' : cols}>
                ${closed ? html`<span class="tl-note">Gesloten</span>`
                  : dayShifts.length === 0 ? html`<span class="tl-note">Nog niemand ingepland</span>`
                  : dayShifts.map(s => html`
                    <div class="lane">
                      <button class="bar" style="--c:${employeeColor(s.employeeId)};${barPos(s, range)}"
                        title="${s.employeeName}, ${s.startTime.slice(0, 5)}-${s.endTime.slice(0, 5)}${s.note ? ' (' + s.note + ')' : ''}"
                        @click=${() => this._openEdit(s)}>
                        <span class="who">${s.employeeName}</span>
                        <span class="when">${s.startTime.slice(0, 5)}-${s.endTime.slice(0, 5)}</span>
                      </button>
                    </div>
                  `)}
              </div>
              <div class="tl-add">
                ${closed ? '' : html`<button class="icon-btn" title="Dienst toevoegen op ${dayFull.toLowerCase()}" @click=${() => this._openAdd(iso)}>${PlusIcon(16)}</button>`}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    const hours = this._shifts.reduce((t, s) => t + diffHours(s.startTime, s.endTime), 0);

    return html`
      <div class="page">
        <div class="page-head">
          <div>
            <h1>Week ${getWeekNumber(this._weekOffset)}</h1>
            <div class="sub">${formatWeekShort(this._weekOffset)}</div>
          </div>
          <div class="actions">
            <div class="weeknav">
              <button class="btn" @click=${this._prevWeek} title="Vorige week">${ChevronLeft(16)}</button>
              <button class="btn" @click=${this._thisWeek} ?disabled=${this._weekOffset === 0}>Deze week</button>
              <button class="btn" @click=${this._nextWeek} title="Volgende week">${ChevronRight(16)}</button>
            </div>
            <button class="btn btn-primary" @click=${() => this._openAdd()} ?disabled=${!this._activeLocationId}>${PlusIcon(16)} Dienst toevoegen</button>
          </div>
        </div>

        ${this._locations.length > 1 ? html`
          <div class="tabs">
            ${this._locations.map(l => html`
              <button class="tab ${this._activeLocationId === l.id ? 'active' : ''}" @click=${() => this._setLocation(l.id)}>${l.name}</button>
            `)}
          </div>
        ` : ''}

        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

        ${this._loading ? html`<div class="loading">Rooster laden...</div>`
          : !this._activeLocationId ? html`<div class="empty"><strong>Nog geen filialen</strong>Voeg eerst een filiaal toe onder Filialen.</div>`
          : html`
            <div class="summary"><b>${this._shifts.length}</b> diensten, samen <b>${hours.toFixed(1)}</b> uur</div>
            ${this._renderWeek()}
          `}
      </div>

      <shift-modal
        .open=${this._modalOpen}
        .shift=${this._editShift}
        .employees=${this._employees}
        .locationId=${this._activeLocationId}
        @close=${this._closeModal}
        @save=${this._handleSave}
        @delete=${this._handleDelete}
      ></shift-modal>

      <confirm-modal
        .open=${!!this._confirmModal}
        .title=${this._confirmModal?.title || ''}
        .message=${this._confirmModal?.message || ''}
        confirmLabel="Verwijderen"
        danger
        @confirm=${() => this._confirmModal?.onConfirm?.()}
        @cancel=${() => this._confirmModal = null}
      ></confirm-modal>
    `;
  }
}

customElements.define('schedule-page', SchedulePage);
