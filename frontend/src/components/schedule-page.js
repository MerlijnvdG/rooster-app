import { LitElement, html, css } from 'lit';
import { ChevronLeft, ChevronRight, PlusIcon, EditIcon, TrashIcon } from '../icons.js';
import { getLocations, getShiftsByLocation, getAllEmployees, createShift, updateShift, deleteShift } from '../api.js';
import { getWeekDays, toISO, addDays, getMonday, formatWeekShort, getWeekNumber, employeeColor, diffHours } from '../date-utils.js';
import './shift-modal.js';
import './employee-detail-modal.js';
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
    _empDetail:        { state: true },
    _confirmModal:     { state: true },
  };

  static styles = css`
    :host { display: block; }

    /* toolbar */
    .toolbar {
      background: var(--app-bg-main);
      border-bottom: 1px solid var(--app-border);
      position: sticky; top: 0; z-index: 50;
    }

    /* alles op een rij */
    .toolbar-nav {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.5rem 1rem;
      overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
    }
    .toolbar-nav::-webkit-scrollbar { display: none; }

    .tab {
      padding: 0.38rem 0.9rem;
      border-radius: 20px;
      border: 1.5px solid var(--app-border);
      background: transparent;
      font-size: 0.85rem; font-weight: 500;
      cursor: pointer; color: var(--app-text-muted);
      transition: all 0.15s; white-space: nowrap; flex-shrink: 0;
    }
    .tab.active {
      background: var(--app-accent);
      border-color: var(--app-accent);
      color: #fff; font-weight: 600;
    }
    .tab:hover:not(.active) { border-color: var(--app-accent); color: var(--app-accent); }

    .tab-divider { width: 1px; height: 20px; background: var(--app-border); flex-shrink: 0; }

    .week-nav {
      display: flex; align-items: center;
      border: 1.5px solid var(--app-border);
      border-radius: 10px; background: var(--app-bg-main);
      overflow: hidden; flex-shrink: 0;
    }

    .nav-arrow {
      width: 34px; height: 36px; border: none; background: none;
      cursor: pointer; color: var(--app-text-muted);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, color 0.15s; flex-shrink: 0;
    }
    .nav-arrow:hover { background: var(--app-bg-light); color: var(--app-text-dark); }

    .week-center {
      padding: 0.25rem 0.7rem; text-align: center;
      border-left: 1px solid var(--app-border);
      border-right: 1px solid var(--app-border);
      min-width: 130px;
    }
    .week-num { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: var(--app-accent); letter-spacing: 0.5px; line-height: 1; }
    .week-range { font-size: 0.8rem; font-weight: 600; color: var(--app-text-dark); white-space: nowrap; line-height: 1.3; }

    .nav-spacer { flex: 1; }

    .add-btn {
      display: flex; align-items: center; gap: 0.35rem;
      background: var(--app-accent); color: #fff;
      border: none; border-radius: 8px;
      padding: 0.45rem 0.9rem;
      font-size: 0.85rem; font-weight: 700;
      cursor: pointer; transition: background 0.15s;
      white-space: nowrap; flex-shrink: 0;
    }
    .add-btn:hover { background: var(--app-accent-hover); }

    /* fout */
    .error-bar {
      margin: 0.75rem 1rem;
      padding: 0.7rem 1rem;
      background: var(--app-discount-light); border: 1px solid rgba(211,47,47,0.25);
      color: var(--app-discount); border-radius: 8px; font-size: 0.84rem;
    }

    /* dagen */
    .week-grid {
      padding: 1rem;
      box-sizing: border-box;
      display: flex; flex-direction: column; gap: 1.1rem;
    }

    .day-card {
      background: var(--app-bg-main);
      border-radius: 12px;
      border: 1.5px solid var(--app-border);
      overflow: hidden;
      box-shadow: var(--app-shadow-card);
    }

    .day-card.today {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 2px rgba(37,99,235,0.2), var(--app-shadow-card);
    }

    .day-card.closed { opacity: 0.5; }
    .day-card.closed .day-header { background: var(--app-card-header); }

    .day-header {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-bottom: 1.5px solid var(--app-border);
      background: var(--app-card-header);
    }

    .day-card.today .day-header { background: rgba(37,99,235,0.12); }

    .day-label { display: flex; align-items: baseline; gap: 0.5rem; flex: 1; min-width: 0; }

    .day-name {
      font-size: 0.95rem; font-weight: 800; color: var(--app-text-dark);
      white-space: nowrap;
    }
    .day-card.today .day-name { color: var(--app-accent); }

    .day-date-str { font-size: 0.8rem; color: var(--app-text-muted); white-space: nowrap; }

    .day-meta { display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0; }

    .staff-pill {
      background: var(--app-accent);
      color: #fff; font-size: 0.7rem; font-weight: 700;
      padding: 0.18rem 0.5rem; border-radius: 20px;
      white-space: nowrap;
    }

    .add-day-btn {
      height: 30px; flex-shrink: 0;
      background: var(--app-bg-light);
      border: 1.5px solid var(--app-border);
      color: var(--app-text-muted);
      border-radius: 7px;
      display: inline-flex; align-items: center; gap: 0.3rem;
      padding: 0 0.65rem;
      cursor: pointer; transition: all 0.15s;
      font-size: 0.8rem; font-weight: 600; white-space: nowrap;
    }
    .add-day-btn:hover {
      border-color: var(--app-accent);
      color: var(--app-accent);
      background: var(--app-bg-main);
    }
    .add-day-label { display: none; }
    @media (min-width: 601px) { .add-day-label { display: inline; } }

    /* diensten per dag */
    .day-shifts {
      padding: 0.65rem 1rem;
      display: flex; flex-wrap: wrap; gap: 0.5rem;
      min-height: 52px; align-items: flex-start;
    }

    .empty-day {
      color: var(--app-text-muted); font-size: 0.82rem;
      font-style: italic; align-self: center; padding: 0.25rem 0;
    }

    .shift-card {
      display: flex; align-items: center; gap: 0.55rem;
      padding: 0.5rem 0.75rem;
      border-radius: 8px; border: 1px solid transparent;
      flex: 1 1 200px; min-width: 0;
      transition: box-shadow 0.15s; cursor: pointer;
    }
    @media (max-width: 480px) { .shift-card { flex: 1 1 100%; } }
    .shift-card:hover { box-shadow: var(--shadow-sm); }

    .emp-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

    .shift-info { flex: 1; min-width: 0; }

    .shift-name {
      font-size: 0.88rem; font-weight: 600; color: var(--app-text-dark);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .shift-time { font-size: 0.76rem; color: var(--app-text-muted); margin-top: 0.05rem; }
    .shift-note { font-size: 0.72rem; color: var(--app-text-muted); font-style: italic; }

    .hours-pill {
      font-size: 0.72rem; font-weight: 700;
      background: var(--app-bg-light);
      padding: 0.18rem 0.45rem; border-radius: 5px;
      white-space: nowrap; flex-shrink: 0;
    }

    .shift-actions { display: flex; gap: 0.3rem; flex-shrink: 0; }

    .icon-btn {
      width: 36px; height: 36px; border: none;
      background: var(--app-icon-btn-bg); border-radius: 7px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--app-text-muted); transition: background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .icon-btn:hover { background: var(--app-icon-btn-hover); color: var(--app-text-dark); }
    .icon-btn.del:hover { background: var(--app-discount-light); color: var(--app-discount); }

    /* laden */
    .skeleton { padding: 1rem; display: flex; flex-direction: column; gap: 0.65rem; }
    .skel { height: 90px; border-radius: 12px; background: linear-gradient(90deg,var(--app-bg-light) 25%,var(--app-border) 50%,var(--app-bg-light) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

    @media (max-width: 600px) {
      .week-grid { padding: 0.75rem; gap: 0.85rem; }
      .day-shifts { padding: 0.6rem 0.75rem; }
      .day-header { padding: 0.65rem 0.75rem; }

      .toolbar-nav { padding: 0.4rem 0.75rem; }
      .week-center { min-width: 110px; }
    }
  `;

  constructor() {
    super();
    this._locations = []; this._activeLocationId = null;
    this._weekOffset = 0; this._shifts = []; this._employees = [];
    this._modalOpen = false; this._editShift = null;
    this._loading = true; this._error = '';
    this._empDetail = null;
    this._confirmModal = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      this._locations = await getLocations();
      this._activeLocationId = this._locations[0]?.id;
      await this._loadData();
    } catch {
      this._error = 'Kon locaties niet laden.';
      this._loading = false;
    }
  }

  async _loadData() {
    if (!this._activeLocationId) return;
    this._loading = true; this._error = '';
    try {
      const mon = getMonday(this._weekOffset);
      const sun = addDays(mon, 6);
      [this._shifts, this._employees] = await Promise.all([
        getShiftsByLocation(this._activeLocationId, toISO(mon), toISO(sun)),
        getAllEmployees(),
      ]);
    } catch { this._error = 'Kon roosterdata niet laden.'; }
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
    } catch (e) { this._error = e.message || 'Opslaan mislukt.'; }
  }

  _handleDelete(id) {
    this._confirmModal = {
      title: 'Dienst verwijderen?',
      message: 'Deze actie kan niet ongedaan worden gemaakt.',
      confirmLabel: 'Verwijderen',
      onConfirm: async () => {
        this._confirmModal = null;
        try { await deleteShift(id); await this._loadData(); }
        catch { this._error = 'Verwijderen mislukt.'; }
      },
    };
  }

  _isToday(iso) { return iso === toISO(new Date()); }

  render() {
    const days = getWeekDays(this._weekOffset);

    return html`
      <div class="toolbar">
        <div class="toolbar-nav">
          <div class="week-nav">
            <button class="nav-arrow" @click=${this._prevWeek}>${ChevronLeft(14)}</button>
            <div class="week-center">
              <div class="week-num">Week ${getWeekNumber(this._weekOffset)}</div>
              <div class="week-range">${formatWeekShort(this._weekOffset)}</div>
            </div>
            <button class="nav-arrow" @click=${this._nextWeek}>${ChevronRight(14)}</button>
          </div>
          <div class="tab-divider"></div>
          ${this._locations.map(l => html`
            <button class="tab ${this._activeLocationId === l.id ? 'active' : ''}"
              @click=${() => this._setLocation(l.id)}>${l.name}</button>
          `)}
          <div class="nav-spacer"></div>
          <button class="add-btn" @click=${() => this._openAdd()}>${PlusIcon(15)} Dienst</button>
        </div>
      </div>

      ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

      ${this._loading ? html`
        <div class="skeleton">${[0,1,2,3,4,5,6].map(() => html`<div class="skel"></div>`)}</div>
      ` : html`
        <div class="week-grid">
          ${days.map(({ iso, dayFull, date }) => {
            const dayShifts = this._shifts.filter(s => s.date === iso);
            const today = this._isToday(iso);
            const isSunday = date.getDay() === 0;
            return html`
              <div class="day-card ${today ? 'today' : ''} ${isSunday ? 'closed' : ''}">
                <div class="day-header">
                  <div class="day-label">
                    <span class="day-name">${dayFull}</span>
                    <span class="day-date-str">${date.getDate()} ${date.toLocaleString('nl', { month: 'long' })}</span>
                  </div>
                  <div class="day-meta">
                    ${dayShifts.length > 0 ? html`
                      <span class="staff-pill">${dayShifts.length} dienst${dayShifts.length !== 1 ? 'en' : ''}</span>
                    ` : ''}
                    ${!isSunday ? html`
                      <button class="add-day-btn" title="Dienst toevoegen" @click=${() => this._openAdd(iso)}>
                        ${PlusIcon(13)}<span class="add-day-label">Dienst toevoegen</span>
                      </button>
                    ` : ''}
                  </div>
                </div>
                <div class="day-shifts">
                  ${isSunday ? html`
                    <span class="empty-day">Gesloten</span>
                  ` : dayShifts.length === 0 ? html`
                    <span class="empty-day">Geen diensten, klik op "+ Dienst toevoegen" om te plannen</span>
                  ` : dayShifts.map(s => {
                    const color = employeeColor(s.employeeId);
                    const hrs = diffHours(s.startTime, s.endTime);
                    return html`
                      <div class="shift-card" style="background:${color}12; border-color:${color}28;"
                        @click=${() => {
                          const emp = this._employees.find(e => e.id === s.employeeId);
                          this._empDetail = { id: s.employeeId, name: s.employeeName, role: emp?.role, locationName: emp?.locationName };
                        }}>
                        <div class="emp-dot" style="background:${color};"></div>
                        <div class="shift-info">
                          <div class="shift-name">${s.employeeName}</div>
                          <div class="shift-time">${s.startTime.slice(0,5)} - ${s.endTime.slice(0,5)}</div>
                          ${s.note ? html`<div class="shift-note">${s.note}</div>` : ''}
                        </div>
                        <span class="hours-pill">${hrs.toFixed(1)}u</span>
                        <div class="shift-actions" @click=${(e) => e.stopPropagation()}>
                          <button class="icon-btn" title="Bewerken" @click=${() => this._openEdit(s)}>${EditIcon(16)}</button>
                          <button class="icon-btn del" title="Verwijderen" @click=${() => this._handleDelete(s.id)}>${TrashIcon(16)}</button>
                        </div>
                      </div>
                    `;
                  })}
                </div>
              </div>
            `;
          })}
        </div>
      `}

      <shift-modal
        .open=${this._modalOpen}
        .shift=${this._editShift}
        .employees=${this._employees}
        .locationId=${this._activeLocationId}
        @close=${this._closeModal}
        @save=${this._handleSave}
      ></shift-modal>

      <employee-detail-modal
        .open=${!!this._empDetail}
        .employee=${this._empDetail}
        @close=${() => this._empDetail = null}
      ></employee-detail-modal>

      <confirm-modal
        .open=${!!this._confirmModal}
        .title=${this._confirmModal?.title || ''}
        .message=${this._confirmModal?.message || ''}
        .confirmLabel=${this._confirmModal?.confirmLabel || 'Verwijderen'}
        danger
        @confirm=${() => this._confirmModal?.onConfirm?.()}
        @cancel=${() => this._confirmModal = null}
      ></confirm-modal>
    `;
  }
}

customElements.define('schedule-page', SchedulePage);
