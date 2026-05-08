import { LitElement, html, css } from 'lit';
import { authStore } from '../store.js';
import { getMyShifts, getTeamShifts, getLocations, getMyLeaveRequests } from '../api.js';
import {
  getWeekDays, getMonday, addDays, toISO, formatWeekShort,
  getWeekNumber, diffHours, MONTHS, isToday, employeeColor,
} from '../date-utils.js';
import { ChevronLeft, ChevronRight, MapPinIcon, CalendarIcon } from '../icons.js';

const DAYS_NL = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];

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

  static styles = css`
    :host { display: block; background: var(--app-bg-light); min-height: calc(100vh - 60px); }

    /* header */
    .dash-header {
      background: var(--app-blue);
      position: sticky; top: 60px; z-index: 40;
      padding: 0.85rem 1rem 0;
      display: flex; flex-direction: column; gap: 0.75rem;
    }

    /* tabs */
    .header-tabs {
      display: flex; gap: 0.4rem;
      background: rgba(255,255,255,0.08);
      border-radius: 12px; padding: 0.3rem;
    }

    .main-tab {
      flex: 1; padding: 0.65rem 1rem;
      border-radius: 9px; border: none;
      background: transparent;
      font-size: 0.92rem; font-weight: 600;
      color: rgba(255,255,255,0.55);
      cursor: pointer; transition: all 0.18s; line-height: 1.2;
    }
    .main-tab.active {
      background: rgba(255,255,255,0.18);
      color: #fff;
      font-weight: 700;
    }
    .main-tab:hover:not(.active) { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.1); }

    /* weeknavigatie */
    .header-week {
      display: flex; align-items: center; justify-content: center;
    }

    .week-nav {
      display: flex; align-items: center;
      background: rgba(255,255,255,0.12);
      border: 1.5px solid rgba(255,255,255,0.3);
      border-radius: 10px; overflow: hidden;
    }

    .nav-arrow {
      width: 42px; height: 44px; border: none; background: none;
      cursor: pointer; color: rgba(255,255,255,0.9);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s; flex-shrink: 0;
    }
    .nav-arrow:hover { background: rgba(255,255,255,0.15); }

    .week-center {
      padding: 0.35rem 1.3rem; text-align: center;
      border-left: 1.5px solid rgba(255,255,255,0.2);
      border-right: 1.5px solid rgba(255,255,255,0.2);
      min-width: 155px;
    }
    .week-num { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: var(--app-accent); letter-spacing: 0.5px; line-height: 1; }
    .week-range { font-size: 0.88rem; font-weight: 700; color: #fff; white-space: nowrap; line-height: 1.3; }

    /* stats */
    .header-stats {
      display: flex; align-items: center;
      padding: 0.75rem 0;
      border-top: 1px solid rgba(255,255,255,0.08);
    }

    .stat-item { flex: 1; text-align: center; }
    .stat-val { font-size: 1.45rem; font-weight: 900; color: #fff; line-height: 1; }
    .stat-lbl { font-size: 0.62rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: rgba(255,255,255,0.45); margin-top: 0.18rem; }

    .stat-div { width: 1px; height: 32px; background: rgba(255,255,255,0.15); flex-shrink: 0; }

    /* filiaal tabs in de header */
    .header-locs {
      display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;
      overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
      padding-bottom: 0.85rem;
    }
    .header-locs::-webkit-scrollbar { display: none; }

    .loc-tab {
      padding: 0.45rem 1.15rem; border-radius: 8px;
      border: 1.5px solid rgba(255,255,255,0.22);
      background: rgba(255,255,255,0.1);
      font-size: 0.85rem; font-weight: 600;
      cursor: pointer; color: rgba(255,255,255,0.75);
      transition: all 0.15s; white-space: nowrap; flex-shrink: 0;
    }
    .loc-tab.active {
      background: var(--app-accent);
      border-color: var(--app-accent);
      color: #fff;
    }
    .loc-tab:hover:not(.active) { background: rgba(255,255,255,0.18); color: #fff; border-color: rgba(255,255,255,0.4); }

    /* content */
    .content { padding: 1rem; display: flex; flex-direction: column; gap: 1.1rem; }

    .error-bar {
      background: var(--app-discount-light); border: 1px solid rgba(211,47,47,0.25);
      color: var(--app-discount); border-radius: 8px; padding: 0.7rem 1rem; font-size: 0.84rem;
    }

    /* leeg */
    .empty {
      display: flex; flex-direction: column; align-items: center;
      padding: 4rem 1.5rem; color: var(--app-text-muted);
      text-align: center; gap: 0.75rem;
    }
    .empty svg { opacity: 0.25; }
    .empty-title { font-size: 1rem; font-weight: 700; color: var(--app-text-dark); }
    .empty-sub { font-size: 0.85rem; line-height: 1.6; }

    /* laden */
    .skeleton { padding: 1rem; display: flex; flex-direction: column; gap: 1.1rem; }
    .skel { border-radius: 14px; background: linear-gradient(90deg,var(--app-bg-light) 25%,var(--app-border) 50%,var(--app-bg-light) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

    /* mijn rooster */
    .mine-card {
      background: var(--app-bg-main);
      border: 1.5px solid var(--app-border);
      border-radius: 14px; overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .mine-card.today-card {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 2px rgba(37,99,235,0.14), 0 2px 8px rgba(0,0,0,0.08);
    }

    .mine-header {
      display: flex; align-items: center; gap: 0.9rem;
      padding: 0.85rem 1rem;
      background: var(--app-card-header);
      border-bottom: 1.5px solid var(--app-border);
    }
    .mine-card.today-card .mine-header { background: rgba(37,99,235,0.08); }

    .mine-date-box {
      width: 50px; height: 50px; border-radius: 12px; flex-shrink: 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: var(--app-blue); color: #fff;
    }
    .mine-card.today-card .mine-date-box { background: var(--app-accent); }

    .mine-date-num { font-size: 1.25rem; font-weight: 900; line-height: 1; }
    .mine-date-short { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.75; margin-top: 1px; }

    .mine-day-info { flex: 1; min-width: 0; }
    .mine-day-name { font-size: 0.97rem; font-weight: 800; color: var(--app-text-dark); line-height: 1.2; }
    .mine-card.today-card .mine-day-name { color: var(--app-accent); }
    .mine-day-date { font-size: 0.78rem; color: var(--app-text-muted); margin-top: 0.1rem; }

    .mine-loc-badge {
      display: flex; align-items: center; gap: 0.35rem;
      background: var(--app-blue); color: #fff;
      border-radius: 8px; padding: 0.4rem 0.8rem;
      font-size: 0.82rem; font-weight: 700;
      white-space: nowrap; flex-shrink: 0; line-height: 1.2;
    }
    .mine-card.today-card .mine-loc-badge { background: var(--app-accent); }

    .mine-shifts { padding: 0 1rem; }

    .mine-shift {
      display: flex; align-items: center; gap: 1rem;
      padding: 0.9rem 0;
      border-bottom: 1px solid var(--app-border);
    }
    .mine-shift:last-child { border-bottom: none; }

    .mine-time-block { flex: 1; min-width: 0; }
    .mine-time { font-size: 1.1rem; font-weight: 800; color: var(--app-text-dark); }
    .mine-duration { font-size: 0.75rem; color: var(--app-text-muted); margin-top: 0.1rem; }
    .mine-note { font-size: 0.75rem; color: var(--app-text-muted); font-style: italic; margin-top: 0.1rem; }

    .now-badge {
      display: inline-flex; align-items: center; gap: 0.3rem;
      background: var(--app-success-light); color: var(--app-success);
      border-radius: 5px; padding: 0.15rem 0.55rem;
      font-size: 0.72rem; font-weight: 700; margin-top: 0.25rem;
    }
    .now-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--app-success); animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

    .mine-hours-pill {
      background: var(--app-accent); color: #fff;
      font-size: 0.85rem; font-weight: 700;
      padding: 0.4rem 0.8rem; border-radius: 8px;
      white-space: nowrap; flex-shrink: 0;
    }

    .leave-strip {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.8rem; font-weight: 600;
      border-top: 1px solid transparent;
    }
    .leave-strip.approved { background: var(--app-approved-light); color: var(--app-approved); border-color: var(--app-approved-border); }
    .leave-strip.pending  { background: var(--app-warning-light); color: var(--app-warning); border-color: var(--app-warning-border); }

    /* rooster */
    .roster-card {
      background: var(--app-bg-main);
      border: 1.5px solid var(--app-border);
      border-radius: 14px; overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .roster-card.today-card {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 2px rgba(37,99,235,0.14), 0 2px 8px rgba(0,0,0,0.08);
    }
    .roster-card.closed-card { opacity: 0.55; }

    .roster-header {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: var(--app-card-header);
      border-bottom: 1.5px solid var(--app-border);
    }
    .roster-card.today-card .roster-header { background: rgba(37,99,235,0.08); }

    .roster-day-name { font-size: 0.97rem; font-weight: 800; color: var(--app-text-dark); }
    .roster-card.today-card .roster-day-name { color: var(--app-accent); }
    .roster-day-date { font-size: 0.8rem; color: var(--app-text-muted); margin-left: 0.1rem; }

    .roster-today-chip {
      margin-left: auto;
      background: var(--app-accent); color: #fff;
      font-size: 0.7rem; font-weight: 700;
      padding: 0.2rem 0.65rem; border-radius: 20px; flex-shrink: 0;
    }
    .roster-count {
      margin-left: auto;
      font-size: 0.75rem; color: var(--app-text-muted);
      white-space: nowrap;
    }

    .roster-list { display: flex; flex-direction: column; }

    .roster-row {
      display: flex; align-items: center; gap: 0.65rem;
      padding: 0.65rem 1rem;
      border-bottom: 1px solid var(--app-border);
      transition: background 0.12s;
    }
    .roster-row:last-child { border-bottom: none; }
    .roster-row.is-me {
      background: rgba(37,99,235,0.06);
    }

    .emp-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

    .roster-name {
      flex: 1; min-width: 0;
      font-size: 0.88rem; font-weight: 600; color: var(--app-text-dark);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .roster-row.is-me .roster-name { color: var(--app-accent); }

    .roster-time { font-size: 0.8rem; color: var(--app-text-muted); white-space: nowrap; }

    .me-chip {
      background: var(--app-accent); color: #fff;
      font-size: 0.68rem; font-weight: 700;
      padding: 0.18rem 0.55rem; border-radius: 20px; flex-shrink: 0;
    }

    .roster-empty {
      padding: 0.8rem 1rem;
      font-size: 0.82rem; color: var(--app-text-muted); font-style: italic;
    }

    /* mobiel */
    @media (max-width: 600px) {
      .content { padding: 0.75rem; gap: 0.85rem; }
      .dash-header { padding: 0.75rem 0.75rem 0; gap: 0.6rem; }
      .main-tab { font-size: 0.85rem; padding: 0.6rem 0.4rem; }
      .week-center { min-width: 130px; }
    }
  `;

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
    await this._loadMine();
  }

  _weekRange() {
    const mon = getMonday(this._weekOffset);
    return { mon, sun: addDays(mon, 6) };
  }

  async _loadMine() {
    this._loading = true; this._error = '';
    try {
      const { mon, sun } = this._weekRange();
      this._shifts = await getMyShifts(toISO(mon), toISO(sun));
    } catch { this._error = 'Kon rooster niet laden.'; }
    finally { this._loading = false; }
  }

  async _loadRoster() {
    if (!this._activeLocationId) return;
    this._loading = true; this._error = '';
    try {
      const { mon, sun } = this._weekRange();
      this._teamShifts = await getTeamShifts(this._activeLocationId, toISO(mon), toISO(sun));
    } catch { this._error = 'Kon rooster niet laden.'; }
    finally { this._loading = false; }
  }

  async _setTab(tab) {
    this._tab = tab;
    if (tab === 'mine') await this._loadMine();
    else await this._loadRoster();
  }

  async _setLocation(id) {
    this._activeLocationId = id;
    await this._loadRoster();
  }

  _prevWeek() { this._weekOffset--; this._tab === 'mine' ? this._loadMine() : this._loadRoster(); }
  _nextWeek() { this._weekOffset++; this._tab === 'mine' ? this._loadMine() : this._loadRoster(); }

  _isNow(dateStr, st, et) {
    if (!isToday(dateStr)) return false;
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    const [sh, sm] = st.slice(0,5).split(':').map(Number);
    const [eh, em] = et.slice(0,5).split(':').map(Number);
    return mins >= sh * 60 + sm && mins < eh * 60 + em;
  }

  _leaveForDay(iso) {
    return this._leaveRequests.find(r =>
      iso >= r.startDate && iso <= r.endDate && (r.status === 'APPROVED' || r.status === 'PENDING')
    );
  }

  _renderMine() {
    const days = getWeekDays(this._weekOffset);
    const working = days.filter(({ iso }) => this._shifts.some(s => s.date === iso));

    if (working.length === 0) return html`
      <div class="empty">
        ${CalendarIcon(52)}
        <div class="empty-title">Geen diensten deze week</div>
        <div class="empty-sub">Je staat deze week niet ingepland.</div>
      </div>
    `;

    return working.map(({ iso, dayShort, dayFull, date }) => {
      const dayShifts = this._shifts.filter(s => s.date === iso);
      const today = isToday(iso);
      const leave = this._leaveForDay(iso);
      const locName = dayShifts[0]?.locationName ?? '';

      return html`
        <div class="mine-card ${today ? 'today-card' : ''}">
          <div class="mine-header">
            <div class="mine-date-box">
              <div class="mine-date-num">${date.getDate()}</div>
              <div class="mine-date-short">${dayShort}</div>
            </div>
            <div class="mine-day-info">
              <div class="mine-day-name">${today ? 'Vandaag' : dayFull}</div>
              <div class="mine-day-date">${date.getDate()} ${MONTHS[date.getMonth()]}</div>
            </div>
            ${locName ? html`
              <div class="mine-loc-badge">${MapPinIcon(12)} ${locName}</div>
            ` : ''}
          </div>

          ${leave ? html`
            <div class="leave-strip ${leave.status === 'APPROVED' ? 'approved' : 'pending'}">
              ${leave.status === 'APPROVED' ? 'Verlof goedgekeurd' : 'Verlof aangevraagd'}
            </div>
          ` : ''}

          <div class="mine-shifts">
            ${dayShifts.map(s => {
              const hrs = diffHours(s.startTime, s.endTime);
              const now = this._isNow(iso, s.startTime, s.endTime);
              return html`
                <div class="mine-shift">
                  <div class="mine-time-block">
                    <div class="mine-time">${s.startTime.slice(0,5)} - ${s.endTime.slice(0,5)}</div>
                    ${now ? html`<div class="now-badge"><div class="now-dot"></div> Nu aan het werk</div>` : ''}
                    ${s.note ? html`<div class="mine-note">${s.note}</div>` : ''}
                  </div>
                  <div class="mine-hours-pill">${hrs.toFixed(1)}u</div>
                </div>
              `;
            })}
          </div>
        </div>
      `;
    });
  }

  _renderRoster() {
    const myId = authStore.user?.id;
    const days = getWeekDays(this._weekOffset);

    return days.map(({ iso, date }) => {
      const today = isToday(iso);
      const isSunday = date.getDay() === 0;
      const dayShifts = [...this._teamShifts.filter(s => s.date === iso)]
        .sort((a, b) => {
          if (a.employeeId === myId) return -1;
          if (b.employeeId === myId) return 1;
          return a.startTime.localeCompare(b.startTime);
        });

      return html`
        <div class="roster-card ${today ? 'today-card' : ''} ${isSunday ? 'closed-card' : ''}">
          <div class="roster-header">
            <span class="roster-day-name">${DAYS_NL[date.getDay()]}</span>
            <span class="roster-day-date">${date.getDate()} ${MONTHS[date.getMonth()]}</span>
            ${today
              ? html`<span class="roster-today-chip">Vandaag</span>`
              : dayShifts.length > 0
                ? html`<span class="roster-count">${dayShifts.length} medewerker${dayShifts.length !== 1 ? 's' : ''}</span>`
                : ''}
          </div>

          <div class="roster-list">
            ${isSunday ? html`<div class="roster-empty">Gesloten</div>` :
              dayShifts.length === 0 ? html`<div class="roster-empty">Niemand ingepland</div>` :
              dayShifts.map(s => {
                const isMe = s.employeeId === myId;
                const color = employeeColor(s.employeeId);
                return html`
                  <div class="roster-row ${isMe ? 'is-me' : ''}">
                    <div class="emp-dot" style="background:${color}"></div>
                    <span class="roster-name">${s.employeeName}</span>
                    <span class="roster-time">${s.startTime.slice(0,5)} - ${s.endTime.slice(0,5)}</span>
                    ${isMe ? html`<span class="me-chip">Jij</span>` : ''}
                  </div>
                `;
              })
            }
          </div>
        </div>
      `;
    });
  }

  render() {
    const isMine = this._tab === 'mine';
    const totalHours = this._shifts.reduce((a, s) => a + diffHours(s.startTime, s.endTime), 0);
    const mineDays  = [...new Set(this._shifts.map(s => s.date))].length;

    return html`
      <div class="dash-header">
        <div class="header-tabs">
          <button class="main-tab ${isMine ? 'active' : ''}"
            @click=${() => this._setTab('mine')}>Mijn rooster</button>
          <button class="main-tab ${!isMine ? 'active' : ''}"
            @click=${() => this._setTab('roster')}>Rooster</button>
        </div>

        <div class="header-week">
          <div class="week-nav">
            <button class="nav-arrow" @click=${this._prevWeek}>${ChevronLeft(14)}</button>
            <div class="week-center">
              <div class="week-num">Week ${getWeekNumber(this._weekOffset)}</div>
              <div class="week-range">${formatWeekShort(this._weekOffset)}</div>
            </div>
            <button class="nav-arrow" @click=${this._nextWeek}>${ChevronRight(14)}</button>
          </div>
        </div>

        ${isMine ? html`
          <div class="header-stats">
            <div class="stat-item">
              <div class="stat-val">${this._loading ? '-' : mineDays}</div>
              <div class="stat-lbl">Diensten</div>
            </div>
            <div class="stat-div"></div>
            <div class="stat-item">
              <div class="stat-val">${this._loading ? '-' : totalHours.toFixed(1)}</div>
              <div class="stat-lbl">Uren deze week</div>
            </div>
          </div>
        ` : this._locations.length ? html`
          <div class="header-locs">
            ${this._locations.map(l => html`
              <button class="loc-tab ${this._activeLocationId === l.id ? 'active' : ''}"
                @click=${() => this._setLocation(l.id)}>${l.name}</button>
            `)}
          </div>
        ` : ''}
      </div>

      ${this._loading ? html`
        <div class="skeleton">
          ${[90, 130, 100, 90, 120].map(h => html`<div class="skel" style="height:${h}px"></div>`)}
        </div>
      ` : html`
        <div class="content">
          ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}
          ${isMine ? this._renderMine() : this._renderRoster()}
        </div>
      `}
    `;
  }
}

customElements.define('employee-dashboard', EmployeeDashboard);
