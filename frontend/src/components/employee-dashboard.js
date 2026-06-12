import { LitElement, html, css } from 'lit';
import { authStore } from '../store.js';
import { getMyShifts, getTeamShifts, getLocations, getMyLeaveRequests } from '../api.js';
import { getWeekDays, getMonday, addDays, toISO, formatWeekShort, getWeekNumber, diffHours, employeeColor } from '../date-utils.js';
import { ChevronLeft, ChevronRight } from '../icons.js';
import { base } from '../ui.js';
import { hourRange, barPos, ruler, shortDate, timelineStyles } from '../timeline.js';

class EmployeeDashboard extends LitElement {
  static properties = {
    _tab:              { state: true },
    _weekOffset:       { state: true },
    _shifts:           { state: true },
    _teamShifts:       { state: true },
    _locations:        { state: true },
    _activeLocationId: { state: true },
    _leaveRequests:    { state: true },
    _loading:          { state: true },
    _error:            { state: true },
  };

  static styles = [base, timelineStyles, css`
    .weeknav { display: flex; gap: 0.25rem; }
    .weeknav .btn { padding: 0.45rem 0.6rem; }

    .tabs { display: flex; gap: 1.25rem; box-shadow: inset 0 -1px 0 var(--app-border); margin-bottom: 1rem; overflow-x: auto; }
    .tab {
      font: inherit; font-size: 0.92rem; background: none; border: none; cursor: pointer; white-space: nowrap;
      color: var(--app-text-muted); padding: 0.5rem 0; border-bottom: 2px solid transparent;
    }
    .tab:hover { color: var(--app-text-dark); }
    .tab.active { color: var(--app-text-dark); font-weight: 700; border-bottom-color: var(--app-accent); }
    .tabs.small { box-shadow: none; gap: 0.4rem; margin-bottom: 0.75rem; }
    .tabs.small .tab { border: 1px solid var(--app-border); border-radius: var(--radius-md); padding: 0.3rem 0.7rem; margin: 0; }
    .tabs.small .tab.active { background: var(--app-bg-main); border-color: var(--app-text-muted); }

    .summary { font-size: 0.9rem; color: var(--app-text-muted); margin-bottom: 0.75rem; }
    .summary b { color: var(--app-text-dark); }

    .week { list-style: none; }
    .day {
      display: grid; grid-template-columns: 7.5rem 1fr auto; gap: 1rem; align-items: center;
      padding: 0.8rem 1rem; border-bottom: 1px solid var(--app-border);
    }
    .day:last-child { border-bottom: none; }
    .day.off { color: var(--app-text-muted); padding-top: 0.55rem; padding-bottom: 0.55rem; }

    .when { display: flex; flex-direction: column; }
    .dname { font-family: var(--font-head); font-stretch: 88%; font-weight: 650; }
    .day.off .dname { font-weight: 500; }
    .ddate { font-size: 0.8rem; color: var(--app-text-muted); }
    .day.today { background: var(--app-today); }
    .day.today .ddate { color: var(--app-text-dark); }

    .time { font-family: var(--font-mono); font-size: 1.05rem; font-weight: 500; }
    .where { font-size: 0.85rem; color: var(--app-text-muted); }
    .free { font-size: 0.9rem; }
    .leave { font-size: 0.82rem; font-weight: 600; color: var(--app-warning); }
    .leave.ok { color: var(--app-approved); }
    .hrs { font-family: var(--font-mono); font-size: 0.85rem; color: var(--app-text-muted); }

    @media (max-width: 600px) {
      .day { grid-template-columns: 5.5rem 1fr auto; gap: 0.6rem; padding: 0.7rem 0.75rem; }
      .page-head .actions { width: 100%; }
    }
  `];

  constructor() {
    super();
    this._tab = 'mine';
    this._weekOffset = 0;
    this._shifts = [];
    this._teamShifts = [];
    this._locations = [];
    this._activeLocationId = null;
    this._leaveRequests = [];
    this._loading = true;
    this._error = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      const [locations, leaveReqs] = await Promise.all([getLocations(), getMyLeaveRequests()]);
      this._locations = locations;
      this._leaveRequests = leaveReqs;
      this._activeLocationId = locations[0]?.id;
    } catch { /* niet erg, rooster laadt nog wel */ }
    await this._load();
  }

  _range() {
    const mon = getMonday(this._weekOffset);
    return [toISO(mon), toISO(addDays(mon, 6))];
  }

  async _load() {
    this._loading = true; this._error = '';
    try {
      if (this._tab === 'mine') this._shifts = await getMyShifts(...this._range());
      else if (this._activeLocationId) this._teamShifts = await getTeamShifts(this._activeLocationId, ...this._range());
    } catch { this._error = 'Het rooster kon niet geladen worden.'; }
    finally { this._loading = false; }
  }

  _setTab(tab) { this._tab = tab; this._load(); }
  _setLocation(id) { this._activeLocationId = id; this._load(); }
  _week(n) { this._weekOffset = n === 0 ? 0 : this._weekOffset + n; this._load(); }

  _leaveOn(iso) {
    return this._leaveRequests.find(r => iso >= r.startDate && iso <= r.endDate && r.status !== 'REJECTED');
  }

  _renderMine() {
    const today = toISO(new Date());
    const hours = this._shifts.reduce((t, s) => t + diffHours(s.startTime, s.endTime), 0);

    return html`
      <div class="summary">
        ${this._shifts.length
          ? html`Je werkt deze week <b>${this._shifts.length}x</b>, samen <b>${hours.toFixed(1)} uur</b>.`
          : 'Je staat deze week niet ingepland.'}
      </div>
      <ul class="week panel">
        ${getWeekDays(this._weekOffset).map(({ iso, dayFull, date }) => {
          const shifts = this._shifts.filter(s => s.date === iso).sort((a, b) => a.startTime.localeCompare(b.startTime));
          const leave = this._leaveOn(iso);
          return html`
            <li class="day ${shifts.length ? '' : 'off'} ${iso === today ? 'today' : ''}">
              <div class="when">
                <span class="dname">${dayFull}</span>
                <span class="ddate">${iso === today ? 'vandaag, ' : ''}${shortDate(date)}</span>
              </div>
              <div>
                ${shifts.length ? shifts.map(s => html`
                  <div class="time">${s.startTime.slice(0, 5)}-${s.endTime.slice(0, 5)}</div>
                  <div class="where">${s.locationName}${s.note ? `, ${s.note}` : ''}</div>
                `) : html`<span class="free">${date.getDay() === 0 ? 'Gesloten' : 'Vrij'}</span>`}
                ${leave ? html`<div class="leave ${leave.status === 'APPROVED' ? 'ok' : ''}">${leave.status === 'APPROVED' ? 'Verlof' : 'Verlof aangevraagd'}</div>` : ''}
              </div>
              <span class="hrs">${shifts.length ? shifts.reduce((t, s) => t + diffHours(s.startTime, s.endTime), 0).toFixed(1) + 'u' : ''}</span>
            </li>
          `;
        })}
      </ul>
    `;
  }

  _renderTeam() {
    // loginCode is het id met voorloopnullen
    const myId = Number(authStore.user?.loginCode);
    const range = hourRange(this._teamShifts);
    const cols = `background-size:${100 / (range.to - range.from)}% 100%`;
    const today = toISO(new Date());

    return html`
      ${this._locations.length > 1 ? html`
        <div class="tabs small">
          ${this._locations.map(l => html`
            <button class="tab ${this._activeLocationId === l.id ? 'active' : ''}" @click=${() => this._setLocation(l.id)}>${l.name}</button>
          `)}
        </div>
      ` : ''}
      <div class="tl">
        <div class="tl-head">
          <div class="tl-day"></div>
          <div class="tl-track" style=${cols}>${ruler(range)}</div>
          <div></div>
        </div>
        ${getWeekDays(this._weekOffset).map(({ iso, dayFull, date }) => {
          const shifts = this._teamShifts.filter(s => s.date === iso).sort((a, b) => a.startTime.localeCompare(b.startTime));
          const closed = date.getDay() === 0;
          return html`
            <div class="tl-row ${iso === today ? 'today' : ''} ${closed ? 'closed' : ''}">
              <div class="tl-day">
                <span class="tl-dayname">${dayFull}</span>
                <span class="tl-date">${iso === today ? 'vandaag, ' : ''}${shortDate(date)}</span>
              </div>
              <div class="tl-track" style=${closed ? '' : cols}>
                ${closed ? html`<span class="tl-note">Gesloten</span>`
                  : shifts.length === 0 ? html`<span class="tl-note">Niemand ingepland</span>`
                  : shifts.map(s => html`
                    <div class="lane">
                      <div class="bar ${s.employeeId === myId ? 'mine' : ''}" style="--c:${employeeColor(s.employeeId)};${barPos(s, range)}">
                        <span class="who">${s.employeeId === myId ? 'Jij' : s.employeeName}</span>
                        <span class="when">${s.startTime.slice(0, 5)}-${s.endTime.slice(0, 5)}</span>
                      </div>
                    </div>
                  `)}
              </div>
              <div></div>
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    return html`
      <div class="page">
        <div class="page-head">
          <div>
            <h1>Week ${getWeekNumber(this._weekOffset)}</h1>
            <div class="sub">${formatWeekShort(this._weekOffset)}</div>
          </div>
          <div class="actions">
            <div class="weeknav">
              <button class="btn" @click=${() => this._week(-1)} title="Vorige week">${ChevronLeft(16)}</button>
              <button class="btn" @click=${() => this._week(0)} ?disabled=${this._weekOffset === 0}>Deze week</button>
              <button class="btn" @click=${() => this._week(1)} title="Volgende week">${ChevronRight(16)}</button>
            </div>
          </div>
        </div>

        <div class="tabs">
          <button class="tab ${this._tab === 'mine' ? 'active' : ''}" @click=${() => this._setTab('mine')}>Mijn diensten</button>
          <button class="tab ${this._tab === 'team' ? 'active' : ''}" @click=${() => this._setTab('team')}>Hele team</button>
        </div>

        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}
        ${this._loading ? html`<div class="loading">Rooster laden...</div>`
          : this._tab === 'mine' ? this._renderMine() : this._renderTeam()}
      </div>
    `;
  }
}

customElements.define('employee-dashboard', EmployeeDashboard);
