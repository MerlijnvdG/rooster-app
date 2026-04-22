import { LitElement, html, css } from 'lit';
import { getLocations, getStats } from '../api.js';
import { getMonday, addDays, toISO, formatWeekShort, getWeekNumber, employeeColor, diffHours } from '../date-utils.js';
import { ChevronLeft, ChevronRight } from '../icons.js';

class StatsPage extends LitElement {
  static properties = {
    _locations: { state: true }, _activeLocationId: { state: true },
    _weekOffset: { state: true }, _stats: { state: true },
    _loading: { state: true }, _error: { state: true },
  };

  static styles = css`
    :host { display: block; }

    .toolbar {
      background: #fff; border-bottom: 1px solid var(--app-border);
      position: sticky; top: 0; z-index: 50;
    }

    .toolbar-inner {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.55rem 1.25rem;
      flex-wrap: wrap;
    }

    .tabs-scroll {
      display: flex; align-items: center; gap: 0.35rem;
      overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
      flex: 1; min-width: 160px;
    }
    .tabs-scroll::-webkit-scrollbar { display: none; }

    .tab { padding: 0.4rem 1rem; border-radius: 20px; border: 1.5px solid var(--app-border); background: transparent; font-size: 0.85rem; font-weight: 500; cursor: pointer; color: var(--app-text-muted); transition: all 0.18s; white-space: nowrap; flex-shrink: 0; }
    .tab.active { background: var(--app-accent); border-color: var(--app-accent); color: #fff; font-weight: 600; }
    .tab:hover:not(.active) { border-color: var(--app-accent); color: var(--app-accent); }

    .week-nav {
      display: flex; align-items: center;
      border: 1.5px solid var(--app-border);
      border-radius: 10px; background: #fff;
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

    .content { padding: 1.5rem; }

    /* totalen */
    .summary-row { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
    .sum-card { background: var(--app-text-dark); color: #fff; border-radius: 12px; padding: 1rem 1.5rem; flex: 1; min-width: 140px; }
    .sum-card.orange { background: var(--app-accent); font-size: 0.95rem; }
    .sum-card.green { background: var(--app-success); }
    .sum-val { font-size: 2rem; font-weight: 900; line-height: 1; }
    .sum-lbl { font-size: 0.78rem; opacity: 0.75; margin-top: 0.3rem; }

    /* per medewerker */
    .emp-list { display: flex; flex-direction: column; gap: 0.75rem; }

    .emp-card {
      background: #fff; border: 1px solid var(--app-border);
      border-radius: 12px; overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .emp-header {
      display: flex; align-items: center; gap: 1rem;
      padding: 0.9rem 1.25rem;
      border-bottom: 1px solid var(--app-border);
    }

    .emp-avatar { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; font-weight: 700; color: #fff; flex-shrink: 0; }
    .emp-name { font-size: 0.95rem; font-weight: 700; color: var(--app-text-dark); }
    .emp-loc { font-size: 0.78rem; color: var(--app-text-muted); margin-top: 0.1rem; }

    .emp-nums { margin-left: auto; display: flex; gap: 1.5rem; flex-shrink: 0; }
    .emp-num { text-align: center; }
    .emp-num-val { font-size: 1.2rem; font-weight: 800; color: var(--app-blue); line-height: 1; }
    .emp-num-lbl { font-size: 0.72rem; color: var(--app-text-muted); margin-top: 0.15rem; }

    /* balk */
    .progress-wrap { padding: 0.75rem 1.25rem; }
    .progress-label { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--app-text-muted); margin-bottom: 0.35rem; }
    .progress-bar { height: 6px; background: var(--app-bg-light); border-radius: 3px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }

    /* diensten */
    .shift-list { padding: 0.5rem 1.25rem 0.9rem; display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .shift-chip { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.3rem 0.65rem; border-radius: 6px; font-size: 0.78rem; }
    .shift-chip .chip-day { font-weight: 600; }
    .shift-chip .chip-time { opacity: 0.8; }

    .empty { text-align: center; padding: 3rem; color: var(--app-text-muted); }
    .error-bar { background: #ffebee; border: 1px solid rgba(211,47,47,0.3); color: #D32F2F; border-radius: 8px; padding: 0.6rem 1rem; margin-bottom: 1rem; font-size: 0.85rem; }

    @media (max-width: 600px) {
      .toolbar-inner { padding: 0.45rem 1rem; gap: 0.4rem; }
      .week-center { min-width: 110px; }
      .content { padding: 1rem; }
      .emp-nums { gap: 0.75rem; }
      .sum-card { min-width: 100px; padding: 0.75rem 1rem; }
      .sum-val { font-size: 1.6rem; }
    }
  `;

  constructor() {
    super();
    this._locations = []; this._activeLocationId = null;
    this._weekOffset = 0; this._stats = [];
    this._loading = true; this._error = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      this._locations = await getLocations();
      this._activeLocationId = this._locations[0]?.id;
      await this._loadStats();
    } catch { this._error = 'Kon statistieken niet laden.'; this._loading = false; }
  }

  async _loadStats() {
    if (!this._activeLocationId) return;
    this._loading = true; this._error = '';
    try {
      const mon = getMonday(this._weekOffset);
      const sun = addDays(mon, 6);
      this._stats = await getStats(this._activeLocationId, toISO(mon), toISO(sun));
    } catch { this._error = 'Kon statistieken niet laden.'; }
    finally { this._loading = false; }
  }

  _setLocation(id) { this._activeLocationId = id; this._loadStats(); }
  _prevWeek()      { this._weekOffset--; this._loadStats(); }
  _nextWeek()      { this._weekOffset++; this._loadStats(); }

  _initials(name)  { return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(); }

  render() {
    const totalShifts = this._stats.reduce((a, s) => a + s.totalShifts, 0);
    const totalHours  = this._stats.reduce((a, s) => a + s.totalHours, 0);
    const maxHours    = Math.max(...this._stats.map(s => s.totalHours), 1);

    const DAYS_SHORT = ['Ma','Di','Wo','Do','Vr','Za','Zo'];

    return html`
      <div class="toolbar">
        <div class="toolbar-inner">
          <div class="tabs-scroll">
            ${this._locations.map(l => html`
              <button class="tab ${this._activeLocationId === l.id ? 'active' : ''}" @click=${() => this._setLocation(l.id)}>${l.name}</button>
            `)}
          </div>
          <div class="week-nav">
            <button class="nav-arrow" @click=${this._prevWeek}>${ChevronLeft(14)}</button>
            <div class="week-center">
              <div class="week-num">Week ${getWeekNumber(this._weekOffset)}</div>
              <div class="week-range">${formatWeekShort(this._weekOffset)}</div>
            </div>
            <button class="nav-arrow" @click=${this._nextWeek}>${ChevronRight(14)}</button>
          </div>
        </div>
      </div>

      <div class="content">
        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

        <div class="summary-row">
          <div class="sum-card">
            <div class="sum-val">${this._stats.length}</div>
            <div class="sum-lbl">Medewerkers ingepland</div>
          </div>
          <div class="sum-card orange">
            <div class="sum-val">${totalShifts}</div>
            <div class="sum-lbl">Diensten deze week</div>
          </div>
          <div class="sum-card green">
            <div class="sum-val">${totalHours.toFixed(1)}</div>
            <div class="sum-lbl">Totaal uren</div>
          </div>
        </div>

        ${this._loading ? html`<div class="empty">Laden...</div>` :
          this._stats.length === 0 ? html`<div class="empty">Geen data voor deze week en locatie.</div>` : html`
          <div class="emp-list">
            ${[...this._stats].sort((a, b) => b.totalHours - a.totalHours).map(s => {
              const color = employeeColor(s.employeeId);
              const pct = maxHours > 0 ? (s.totalHours / maxHours * 100).toFixed(1) : 0;
              return html`
                <div class="emp-card">
                  <div class="emp-header">
                    <div class="emp-avatar" style="background:${color}">${this._initials(s.employeeName)}</div>
                    <div>
                      <div class="emp-name">${s.employeeName}</div>
                      <div class="emp-loc">${s.locationName}</div>
                    </div>
                    <div class="emp-nums">
                      <div class="emp-num">
                        <div class="emp-num-val">${s.totalHours.toFixed(1)}</div>
                        <div class="emp-num-lbl">uren</div>
                      </div>
                      <div class="emp-num">
                        <div class="emp-num-val">${s.totalShifts}</div>
                        <div class="emp-num-lbl">diensten</div>
                      </div>
                      <div class="emp-num">
                        <div class="emp-num-val">${s.totalShifts > 0 ? (s.totalHours / s.totalShifts).toFixed(1) : '0'}</div>
                        <div class="emp-num-lbl">gem. u/dienst</div>
                      </div>
                    </div>
                  </div>
                  <div class="progress-wrap">
                    <div class="progress-label">
                      <span>Uren t.o.v. meeste collega</span>
                      <span>${pct}%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:${pct}%; background:${color};"></div>
                    </div>
                  </div>
                  ${s.shifts.length > 0 ? html`
                    <div class="shift-list">
                      ${s.shifts.map(sh => {
                        const d = new Date(sh.date);
                        const dayIdx = (d.getDay() + 6) % 7;
                        return html`
                          <span class="shift-chip" style="background:${color}15; color:${color}; border:1px solid ${color}30;">
                            <span class="chip-day">${DAYS_SHORT[dayIdx]}</span>
                            <span class="chip-time">${sh.startTime.slice(0,5)}-${sh.endTime.slice(0,5)}</span>
                          </span>
                        `;
                      })}
                    </div>
                  ` : ''}
                </div>
              `;
            })}
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('stats-page', StatsPage);
