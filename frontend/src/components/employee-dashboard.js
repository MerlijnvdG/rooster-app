import { LitElement, html, css } from 'lit';
import { authStore } from '../store.js';
import { getMyShifts, getTeamShifts, getMyLeaveRequests } from '../api.js';
import { getWeekDays, getMonday, addDays, toISO, formatWeekShort, getWeekNumber, diffHours, MONTHS, isToday, isPast, employeeColor } from '../date-utils.js';
import { ChevronLeft, ChevronRight, HomeIcon, MapPinIcon, CalendarIcon, UsersIcon } from '../icons.js';

class EmployeeDashboard extends LitElement {
  static properties = {
    _weekOffset:    { state: true },
    _shifts:        { state: true },
    _teamShifts:    { state: true },
    _leaveRequests: { state: true },
    _loading:       { state: true },
    _error:         { state: true },
    _view:          { state: true },
  };

  static styles = css`
    :host { display: block; background: var(--app-bg-light); overflow-x: hidden; }

    /* Hero */
    .hero {
      background: var(--app-blue);
      padding: 1.25rem 1rem 1.5rem;
      color: #fff;
    }

    .hero-top {
      display: flex; align-items: flex-start;
      justify-content: space-between; gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .greeting { font-size: 1.35rem; font-weight: 800; line-height: 1.2; }
    .greeting-sub { font-size: 0.82rem; opacity: 0.8; margin-top: 0.25rem; }

    .view-toggle {
      display: flex; gap: 0.2rem;
      background: rgba(255,255,255,0.2);
      border-radius: 8px; padding: 0.2rem;
      flex-shrink: 0;
    }

    .view-btn {
      padding: 0.35rem 0.8rem;
      border: none; background: none;
      color: rgba(255,255,255,0.75);
      font-size: 0.8rem; font-weight: 500;
      border-radius: 6px; cursor: pointer;
      transition: all 0.15s; min-height: 34px;
    }

    .view-btn.active {
      background: #fff;
      color: var(--app-accent);
      font-weight: 700;
    }

    /* stats */
    .stats-row { display: flex; gap: 0.6rem; }

    .stat {
      flex: 1;
      background: rgba(255,255,255,0.18);
      border-radius: 10px;
      padding: 0.7rem 0.75rem;
      text-align: center;
    }

    .stat-val { font-size: 1.5rem; font-weight: 900; line-height: 1; }
    .stat-lbl { font-size: 0.68rem; opacity: 0.8; margin-top: 0.2rem; }

    /* Week nav bar */
    .week-bar {
      background: #fff;
      border-bottom: 1px solid var(--app-border);
      padding: 0.5rem 1rem;
      display: flex; align-items: center; justify-content: center;
      position: sticky; top: 0; z-index: 50;
    }

    .week-nav {
      display: flex; align-items: center;
      border: 1.5px solid var(--app-border);
      border-radius: 10px; background: #fff;
      overflow: hidden;
    }

    .nav-arrow {
      width: 36px; height: 38px; border: none; background: none;
      cursor: pointer; color: var(--app-text-muted);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, color 0.15s; flex-shrink: 0;
    }

    .nav-arrow:hover { background: var(--app-bg-light); color: var(--app-text-dark); }

    .week-center {
      padding: 0.3rem 0.85rem; text-align: center;
      border-left: 1px solid var(--app-border);
      border-right: 1px solid var(--app-border);
      min-width: 140px;
    }
    .week-num { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: var(--app-accent); letter-spacing: 0.5px; line-height: 1; }
    .week-range { font-size: 0.82rem; font-weight: 600; color: var(--app-text-dark); white-space: nowrap; line-height: 1.3; }

    /* Content */
    .content { padding: 1rem; }

    .error-bar {
      background: #ffebee; border: 1px solid rgba(211,47,47,0.25);
      color: #C62828; border-radius: 8px; padding: 0.7rem 1rem;
      margin-bottom: 0.75rem; font-size: 0.84rem;
    }

    /* === WEEK VIEW === */
    .day-list { display: flex; flex-direction: column; gap: 0.6rem; }

    .day-card {
      background: #fff;
      border: 1.5px solid var(--app-border);
      border-radius: 12px; overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .day-card.today-card { border-color: var(--app-accent); }

    .day-row {
      display: flex; align-items: center; gap: 0.85rem;
      padding: 0.9rem 1rem;
    }

    .day-indicator {
      width: 46px; height: 46px; border-radius: 10px; flex-shrink: 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: var(--app-bg-light);
    }

    .day-indicator.today-ind { background: var(--app-accent); color: #fff; }
    .day-indicator.past-ind { opacity: 0.45; }

    .day-num { font-size: 1.15rem; font-weight: 900; line-height: 1; }
    .day-short { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 0.1rem; }

    .day-info { flex: 1; min-width: 0; }
    .day-full { font-size: 0.92rem; font-weight: 700; color: var(--app-text-dark); }
    .day-month { font-size: 0.75rem; color: var(--app-text-muted); margin-top: 0.05rem; }

    .free-badge {
      display: inline-flex; align-items: center; gap: 0.3rem;
      background: var(--app-bg-light);
      border: 1px solid var(--app-border);
      border-radius: 6px; padding: 0.3rem 0.65rem;
      font-size: 0.78rem; color: var(--app-text-muted); white-space: nowrap;
      flex-shrink: 0;
    }

    .leave-banner {
      padding: 0.45rem 1rem;
      font-size: 0.78rem; font-weight: 600;
      display: flex; align-items: center; gap: 0.4rem;
    }
    .leave-banner.approved { background: #D1FAE5; color: #065F46; border-top: 1px solid #A7F3D0; }
    .leave-banner.pending  { background: #FEF3C7; color: #92400E; border-top: 1px solid #FDE68A; }

    /* Shift block */
    .shift-block {
      border-top: 1px solid var(--app-border);
      padding: 0.75rem 1rem;
    }

    .shift-inner {
      display: flex; align-items: center; gap: 0.85rem;
      background: rgba(37,99,235,0.05);
      border: 1px solid rgba(37,99,235,0.2);
      border-radius: 10px;
      padding: 0.85rem 1rem;
    }

    .shift-time-big {
      font-size: 1.05rem; font-weight: 800;
      color: var(--app-text-dark);
      white-space: nowrap; flex-shrink: 0;
    }

    .shift-meta { flex: 1; min-width: 0; }
    .shift-loc { font-size: 0.8rem; color: var(--app-text-muted); margin-top: 0.1rem; display: flex; align-items: center; gap: 0.25rem; }
    .shift-note { font-size: 0.75rem; color: var(--app-text-muted); font-style: italic; }

    .hours-badge {
      background: var(--app-accent);
      color: #fff; font-size: 0.8rem; font-weight: 700;
      padding: 0.3rem 0.7rem; border-radius: 6px; white-space: nowrap; flex-shrink: 0;
    }

    .now-badge {
      display: inline-flex; align-items: center; gap: 0.3rem;
      background: #e8f5e9; color: #2E7D32;
      border-radius: 4px; padding: 0.15rem 0.5rem;
      font-size: 0.72rem; font-weight: 700; margin-top: 0.25rem;
    }

    .now-dot { width: 6px; height: 6px; border-radius: 50%; background: #2E7D32; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

    /* === AGENDA VIEW === */
    .agenda-empty {
      text-align: center; padding: 3rem 1rem;
      color: var(--app-text-muted);
    }

    .agenda-empty .big-icon { display: flex; justify-content: center; margin-bottom: 0.75rem; color: var(--app-border); }
    .agenda-empty p { font-size: 0.9rem; }

    .agenda-list { display: flex; flex-direction: column; gap: 1rem; }

    .agenda-date-header {
      display: flex; align-items: center; gap: 0.75rem;
      margin-top: 0.5rem;
    }

    .agenda-date-pill {
      background: var(--app-accent);
      color: #fff; border-radius: 8px;
      padding: 0.35rem 0.85rem;
      font-size: 0.82rem; font-weight: 700; white-space: nowrap;
    }

    .agenda-date-pill.today-pill { background: var(--app-accent); }
    .agenda-date-pill.future-pill { background: var(--app-blue); }

    .agenda-line { flex: 1; height: 1px; background: var(--app-border); }

    .agenda-card {
      background: #fff;
      border: 1.5px solid var(--app-border);
      border-radius: 12px; padding: 1rem;
      box-shadow: var(--shadow-sm);
      display: flex; gap: 1rem; align-items: center;
    }

    .agenda-card.today-agenda { border-color: var(--app-accent); }

    .agenda-time-col { text-align: center; flex-shrink: 0; }
    .agenda-time { font-size: 1rem; font-weight: 800; color: var(--app-text-dark); }
    .agenda-time-end { font-size: 0.75rem; color: var(--app-text-muted); }

    .agenda-divider { width: 1px; background: var(--app-border); align-self: stretch; flex-shrink: 0; }

    .agenda-detail { flex: 1; min-width: 0; }
    .agenda-loc { font-size: 0.82rem; color: var(--app-text-muted); margin-top: 0.15rem; }
    .agenda-note { font-size: 0.75rem; color: var(--app-text-muted); font-style: italic; margin-top: 0.1rem; }

    .agenda-hours { font-size: 0.9rem; font-weight: 800; color: var(--app-accent); flex-shrink: 0; }

    .empty-week { text-align: center; padding: 2.5rem 1rem; color: var(--app-text-muted); font-size: 0.88rem; }

    /* === TEAM VIEW === */
    .team-day { margin-bottom: 0.6rem; }

    .team-day-header {
      display: flex; align-items: center; gap: 0.6rem;
      padding: 0.35rem 0; margin-bottom: 0.4rem;
    }

    .team-day-name {
      font-size: 0.82rem; font-weight: 700;
      color: var(--app-text-dark); white-space: nowrap;
    }

    .team-day-date { font-size: 0.75rem; color: var(--app-text-muted); }
    .team-day-line { flex: 1; height: 1px; background: var(--app-border); }

    .team-day-today .team-day-name { color: var(--app-accent); }

    .team-card {
      display: flex; align-items: center; gap: 0.75rem;
      background: #fff;
      border: 1px solid var(--app-border);
      border-radius: 10px; padding: 0.7rem 1rem;
      margin-bottom: 0.4rem;
      box-shadow: var(--shadow-sm);
    }

    .team-card.is-me {
      border-color: var(--app-accent);
      background: rgba(37,99,235,0.03);
    }

    .team-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.72rem; font-weight: 700; color: #fff;
      flex-shrink: 0;
    }

    .team-name { font-size: 0.88rem; font-weight: 600; color: var(--app-text-dark); }
    .team-time { font-size: 0.75rem; color: var(--app-text-muted); margin-top: 0.05rem; }

    .team-me-badge {
      margin-left: auto;
      background: var(--app-accent); color: #fff;
      font-size: 0.68rem; font-weight: 700;
      padding: 0.18rem 0.55rem; border-radius: 20px;
      white-space: nowrap; flex-shrink: 0;
    }

    .team-hours {
      margin-left: auto;
      font-size: 0.78rem; font-weight: 700;
      color: var(--app-text-muted);
      white-space: nowrap; flex-shrink: 0;
    }

    .team-free-day {
      text-align: center; padding: 0.6rem;
      color: var(--app-text-muted); font-size: 0.78rem; font-style: italic;
    }

    @media (max-width: 600px) {
      .hero { padding: 1rem 0.9rem 1.25rem; }
      .content { padding: 0.75rem; }
      .week-bar { top: 60px; padding: 0.45rem 0.75rem; }
      .week-center { min-width: 120px; }
      .shift-inner { flex-wrap: wrap; gap: 0.5rem; }
      .shift-time-big { font-size: 0.95rem; }
    }
  `;

  constructor() {
    super();
    this._weekOffset = 0; this._shifts = []; this._teamShifts = [];
    this._leaveRequests = [];
    this._loading = true; this._error = '';
    this._view = 'week';
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._load();
  }

  async _load() {
    this._loading = true; this._error = '';
    try {
      const mon = getMonday(this._weekOffset);
      const sun = addDays(mon, 6);
      const mine = await getMyShifts(toISO(mon), toISO(sun));
      this._shifts = mine;
      // Derive unique locations from own shifts this week
      const locationIds = [...new Set(mine.map(s => s.locationId).filter(Boolean))];
      const [teamResults, leaveReqs] = await Promise.all([
        Promise.all(locationIds.map(lid => getTeamShifts(lid, toISO(mon), toISO(sun)))),
        getMyLeaveRequests(),
      ]);
      this._teamShifts = teamResults.flat();
      this._leaveRequests = leaveReqs;
    } catch { this._error = 'Kon rooster niet laden.'; }
    finally { this._loading = false; }
  }

  _prevWeek() { this._weekOffset--; this._load(); }
  _nextWeek() { this._weekOffset++; this._load(); }
  _thisWeek() { this._weekOffset = 0; this._load(); }

  _totalHours() { return this._shifts.reduce((a, s) => a + diffHours(s.startTime, s.endTime), 0); }

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

  _greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Goedemorgen';
    if (h < 18) return 'Goedemiddag';
    return 'Goedenavond';
  }

  _renderWeekView(days) {
    return html`
      <div class="day-list">
        ${days.map(({ iso, dayShort, dayFull, date }) => {
          const dayShifts = this._shifts.filter(s => s.date === iso);
          const today = isToday(iso);
          const past  = isPast(iso) && !today;
          return html`
            <div class="day-card ${today ? 'today-card' : ''}">
              <div class="day-row">
                <div class="day-indicator ${today ? 'today-ind' : past ? 'past-ind' : ''}">
                  <div class="day-num">${date.getDate()}</div>
                  <div class="day-short">${dayShort}</div>
                </div>
                <div class="day-info">
                  <div class="day-full">${dayFull}</div>
                  <div class="day-month">${MONTHS[date.getMonth()]}</div>
                </div>
                ${dayShifts.length === 0 ? html`<div class="free-badge">${HomeIcon(14)} Vrij</div>` : ''}
              </div>
              ${(() => {
                const leave = this._leaveForDay(iso);
                if (leave) {
                  const cls = leave.status === 'APPROVED' ? 'approved' : 'pending';
                  const label = leave.status === 'APPROVED' ? 'Verlof goedgekeurd' : 'Verlof aangevraagd (in behandeling)';
                  return html`<div class="leave-banner ${cls}">${label}</div>`;
                }
                return '';
              })()}
              ${dayShifts.map(s => {
                const hrs = diffHours(s.startTime, s.endTime);
                const now = this._isNow(iso, s.startTime, s.endTime);
                return html`
                  <div class="shift-block">
                    <div class="shift-inner">
                      <div>
                        <div class="shift-time-big">${s.startTime.slice(0,5)} - ${s.endTime.slice(0,5)}</div>
                        ${now ? html`<div class="now-badge"><div class="now-dot"></div> Nu aan het werk</div>` : ''}
                      </div>
                      <div class="shift-meta">
                        <div class="shift-loc">${MapPinIcon(12)} ${s.locationName}</div>
                        ${s.note ? html`<div class="shift-note">${s.note}</div>` : ''}
                      </div>
                      <div class="hours-badge">${hrs.toFixed(1)}u</div>
                    </div>
                  </div>
                `;
              })}
            </div>
          `;
        })}
      </div>
    `;
  }

  _renderAgendaView() {
    // Only show days with shifts, sorted by date
    const shiftDays = [...this._shifts]
      .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));

    if (shiftDays.length === 0) {
      return html`
        <div class="agenda-empty">
          <div class="big-icon">${CalendarIcon(48)}</div>
          <p>Geen diensten gepland deze week.<br>Kijk een andere week of vraag je manager.</p>
        </div>
      `;
    }

    // Group by date
    const grouped = shiftDays.reduce((acc, s) => {
      (acc[s.date] = acc[s.date] || []).push(s);
      return acc;
    }, {});

    return html`
      <div class="agenda-list">
        ${Object.entries(grouped).map(([date, shifts]) => {
          const d = new Date(date);
          const today = isToday(date);
          const dayName = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'][d.getDay()];
          return html`
            <div>
              <div class="agenda-date-header">
                <div class="agenda-date-pill ${today ? 'today-pill' : 'future-pill'}">
                  ${today ? 'Vandaag' : dayName} ${d.getDate()} ${MONTHS[d.getMonth()]}
                </div>
                <div class="agenda-line"></div>
              </div>
              ${shifts.map(s => {
                const hrs = diffHours(s.startTime, s.endTime);
                const now = this._isNow(date, s.startTime, s.endTime);
                return html`
                  <div class="agenda-card ${today ? 'today-agenda' : ''}">
                    <div class="agenda-time-col">
                      <div class="agenda-time">${s.startTime.slice(0,5)}</div>
                      <div class="agenda-time-end">t/m ${s.endTime.slice(0,5)}</div>
                    </div>
                    <div class="agenda-divider"></div>
                    <div class="agenda-detail">
                      <strong style="font-size:0.9rem">${s.locationName}</strong>
                      ${now ? html`<div class="now-badge" style="margin-top:0.25rem"><div class="now-dot"></div> Nu actief</div>` : ''}
                      ${s.note ? html`<div class="agenda-note">${s.note}</div>` : ''}
                    </div>
                    <div class="agenda-hours">${hrs.toFixed(1)}u</div>
                  </div>
                `;
              })}
            </div>
          `;
        })}
      </div>
    `;
  }

  _initials(name) {
    return (name || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  _renderTeamView(days) {
    const myId = authStore.user?.id;
    const DAYS = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];

    return html`
      <div>
        ${days.map(({ iso, date }) => {
          const dayShifts = [...this._teamShifts.filter(s => s.date === iso)]
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
          const today = isToday(iso);
          const past  = isPast(iso) && !today;
          return html`
            <div class="team-day ${today ? 'team-day-today' : ''}">
              <div class="team-day-header">
                <span class="team-day-name">${DAYS[date.getDay()]}</span>
                <span class="team-day-date">${date.getDate()} ${MONTHS[date.getMonth()]}</span>
                <div class="team-day-line"></div>
                ${today ? html`<span style="font-size:0.72rem;font-weight:700;color:var(--app-accent,#2563EB);white-space:nowrap">Vandaag</span>` : ''}
              </div>
              ${dayShifts.length === 0 ? html`
                <div class="team-free-day">Niemand ingepland</div>
              ` : dayShifts.map(s => {
                const isMe = s.employeeId === myId;
                const color = employeeColor(s.employeeId);
                const hrs = diffHours(s.startTime, s.endTime);
                return html`
                  <div class="team-card ${isMe ? 'is-me' : ''}" style="opacity:${past ? 0.6 : 1}">
                    <div class="team-avatar" style="background:${color}">${this._initials(s.employeeName)}</div>
                    <div style="flex:1;min-width:0">
                      <div class="team-name">${s.employeeName}</div>
                      <div class="team-time">${s.startTime.slice(0,5)} - ${s.endTime.slice(0,5)}</div>
                    </div>
                    ${isMe
                      ? html`<span class="team-me-badge">Jij</span>`
                      : html`<span class="team-hours">${hrs.toFixed(1)}u</span>`}
                  </div>
                `;
              })}
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    const user = authStore.user;
    const days = getWeekDays(this._weekOffset);
    const totalHours = this._totalHours();
    const workedDays = days.filter(d => this._shifts.some(s => s.date === d.iso)).length;

    return html`
      <div class="hero">
        <div class="hero-top">
          <div>
            <div class="greeting">${this._greeting()}, ${user?.fullName?.split(' ')[0] || ''}!</div>
            <div class="greeting-sub">Mijn rooster</div>
          </div>
          <div class="view-toggle">
            <button class="view-btn ${this._view === 'week' ? 'active' : ''}" @click=${() => this._view = 'week'}>Week</button>
            <button class="view-btn ${this._view === 'agenda' ? 'active' : ''}" @click=${() => this._view = 'agenda'}>Agenda</button>
            <button class="view-btn ${this._view === 'team' ? 'active' : ''}" @click=${() => this._view = 'team'}>${UsersIcon(14)}</button>
          </div>
        </div>
        <div class="stats-row">
          <div class="stat">
            <div class="stat-val">${workedDays}</div>
            <div class="stat-lbl">Werkdagen</div>
          </div>
          <div class="stat">
            <div class="stat-val">${totalHours.toFixed(1)}</div>
            <div class="stat-lbl">Uren</div>
          </div>
          <div class="stat">
            <div class="stat-val">${this._shifts.length > 0 ? (totalHours / this._shifts.length).toFixed(1) : '-'}</div>
            <div class="stat-lbl">Gem. per dienst</div>
          </div>
        </div>
      </div>

      <div class="week-bar">
        <div class="week-nav">
          <button class="nav-arrow" @click=${this._prevWeek}>${ChevronLeft(14)}</button>
          <div class="week-center">
            <div class="week-num">Week ${getWeekNumber(this._weekOffset)}</div>
            <div class="week-range">${formatWeekShort(this._weekOffset)}</div>
          </div>
          <button class="nav-arrow" @click=${this._nextWeek}>${ChevronRight(14)}</button>
        </div>
      </div>

      <div class="content">
        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}
        ${this._loading ? html`<div class="empty-week">Laden...</div>` :
          this._view === 'week'   ? this._renderWeekView(days)  :
          this._view === 'agenda' ? this._renderAgendaView()    :
          this._renderTeamView(days)
        }
      </div>
    `;
  }
}

customElements.define('employee-dashboard', EmployeeDashboard);
