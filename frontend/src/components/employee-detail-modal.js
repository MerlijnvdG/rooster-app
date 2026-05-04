import { LitElement, html, css } from 'lit';
import { getLeaveRequestsForEmployee, getShiftsForEmployee } from '../api.js';
import { XIcon, UmbrellaIcon, BuildingIcon } from '../icons.js';
import { employeeColor, diffHours, getMonday, addDays, toISO } from '../date-utils.js';

class EmployeeDetailModal extends LitElement {
  static properties = {
    employee: {},
    open:     { type: Boolean },
    _shifts:  { state: true },
    _leave:   { state: true },
    _loading: { state: true },
  };

  static styles = css`
    .backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      display: flex; align-items: flex-end; justify-content: center;
      z-index: 500;
    }
    @media (min-width: 560px) {
      .backdrop { align-items: center; padding: 1rem; }
    }

    .modal {
      background: var(--app-bg-main); border-radius: 20px 20px 0 0;
      width: 100%; max-width: 520px; max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 -4px 40px rgba(0,0,0,0.2);
    }
    @media (min-width: 560px) {
      .modal { border-radius: 16px; max-height: 85vh; }
    }

    .modal-head {
      padding: 1.75rem 1.5rem 1.25rem;
      position: relative;
      border-radius: 20px 20px 0 0;
    }
    @media (min-width: 560px) {
      .modal-head { border-radius: 16px 16px 0 0; }
    }

    .close-btn {
      position: absolute; top: 1rem; right: 1rem;
      background: rgba(255,255,255,0.22); border: none; cursor: pointer;
      width: 34px; height: 34px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; transition: background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .close-btn:hover { background: rgba(255,255,255,0.38); }

    .head-avatar {
      width: 68px; height: 68px; border-radius: 18px;
      background: rgba(255,255,255,0.22);
      border: 2.5px solid rgba(255,255,255,0.45);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; font-weight: 800; color: #fff;
      margin-bottom: 0.8rem; flex-shrink: 0;
    }
    .head-name {
      font-size: 1.3rem; font-weight: 800; color: #fff;
      line-height: 1.2; margin-bottom: 0.6rem;
    }
    .head-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; }
    .head-badge {
      font-size: 0.72rem; font-weight: 700; padding: 0.22rem 0.65rem;
      border-radius: 20px; background: rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.95); letter-spacing: 0.3px;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .modal-body { padding: 1.25rem 1.5rem 2rem; }

    .section { margin-bottom: 1.5rem; }
    .section-title {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px; color: var(--app-text-muted);
      margin-bottom: 0.65rem;
    }

    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
    .stat-card {
      background: var(--app-bg-light);
      border-radius: 10px; padding: 0.8rem 0.5rem; text-align: center;
    }
    .stat-val { font-size: 1.4rem; font-weight: 900; color: var(--app-text-dark); }
    .stat-val.accent { color: var(--app-accent); }
    .stat-lbl { font-size: 0.65rem; color: var(--app-text-muted); margin-top: 0.2rem; }

    .shift-row {
      display: flex; align-items: center; gap: 0.65rem;
      padding: 0.55rem 0; border-bottom: 1px solid var(--app-border);
    }
    .shift-row:last-child { border-bottom: none; }
    .shift-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .shift-date { font-size: 0.78rem; color: var(--app-text-muted); width: 80px; flex-shrink: 0; }
    .shift-time { font-size: 0.88rem; font-weight: 600; flex: 1; }
    .shift-hrs { font-size: 0.78rem; font-weight: 700; color: var(--app-accent); white-space: nowrap; }

    .leave-pills { display: flex; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 0.85rem; }
    .leave-pill {
      display: inline-flex; align-items: center; gap: 0.3rem;
      padding: 0.28rem 0.7rem; border-radius: 20px;
      font-size: 0.76rem; font-weight: 600;
    }
    .pill-total    { background: var(--app-bg-light); color: var(--app-text-dark); }
    .pill-pending  { background: var(--app-warning-light); color: var(--app-warning); }
    .pill-approved { background: var(--app-approved-light); color: var(--app-approved); }
    .pill-rejected { background: #FEE2E2; color: #991B1B; }

    .leave-card {
      border-radius: 9px; padding: 0.7rem 0.9rem; margin-bottom: 0.4rem;
      border-left: 3px solid transparent;
    }
    .leave-card.approved { background: var(--app-approved-light); border-left-color: var(--app-approved); }
    .leave-card.pending  { background: var(--app-warning-light); border-left-color: var(--app-warning); }
    .leave-card.rejected { background: #FEE2E2; border-left-color: #EF4444; }

    .leave-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.2rem; }
    .leave-dates { font-size: 0.85rem; font-weight: 700; }
    .leave-status-badge {
      font-size: 0.66rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.4px; padding: 0.12rem 0.45rem;
      border-radius: 20px; white-space: nowrap;
    }
    .leave-card.approved .leave-status-badge { background: rgba(16,185,129,0.18); color: var(--app-approved); }
    .leave-card.pending  .leave-status-badge { background: rgba(245,158,11,0.2); color: var(--app-warning); }
    .leave-card.rejected .leave-status-badge { background: rgba(239,68,68,0.18); color: #991B1B; }

    .leave-reason { font-size: 0.78rem; opacity: 0.8; }
    .leave-rejection { font-size: 0.76rem; font-style: italic; margin-top: 0.2rem; opacity: 0.75; }

    .empty-note { font-size: 0.83rem; color: var(--app-text-muted); }

    .divider { border: none; border-top: 1px solid var(--app-border); margin: 0 0 1.5rem; }
  `;

  constructor() {
    super();
    this._shifts  = [];
    this._leave   = [];
    this._loading = false;
  }

  updated(changed) {
    if (changed.has('open') && this.open && this.employee) {
      this._loadData();
    }
  }

  async _loadData() {
    this._loading = true;
    const mon = getMonday(0);
    const sun = addDays(mon, 6);
    try {
      [this._shifts, this._leave] = await Promise.all([
        getShiftsForEmployee(this.employee.id, toISO(mon), toISO(sun)),
        getLeaveRequestsForEmployee(this.employee.id),
      ]);
    } catch {
      this._shifts = [];
      this._leave  = [];
    } finally {
      this._loading = false;
    }
  }

  _initials(name) {
    return (name || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  _fmtDate(d) {
    return new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
  }

  _statusLabel(s) {
    return { PENDING: 'In behandeling', APPROVED: 'Goedgekeurd', REJECTED: 'Afgewezen' }[s] || s;
  }

  render() {
    if (!this.open || !this.employee) return html``;
    const emp   = this.employee;
    const color = employeeColor(emp.id);

    const empShifts = [...(this._shifts || [])]
      .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
    const totalHours = empShifts.reduce((a, s) => a + diffHours(s.startTime, s.endTime), 0);

    const pending  = this._leave.filter(r => r.status === 'PENDING').length;
    const approved = this._leave.filter(r => r.status === 'APPROVED').length;
    const rejected = this._leave.filter(r => r.status === 'REJECTED').length;

    const DAYS = ['zo','ma','di','wo','do','vr','za'];

    return html`
      <div class="backdrop" @click=${e => e.target === e.currentTarget && this._close()}>
        <div class="modal">

          <div class="modal-head" style="background: linear-gradient(140deg, ${color} 0%, ${color}bb 100%)">
            <button class="close-btn" @click=${this._close}>${XIcon(14)}</button>
            <div class="head-avatar">${this._initials(emp.name)}</div>
            <div class="head-name">${emp.name}</div>
            <div class="head-badges">
              <span class="head-badge">${emp.role === 'EMPLOYER' ? 'Manager' : 'Medewerker'}</span>
              ${emp.locationName ? html`<span class="head-badge">${BuildingIcon(11)} ${emp.locationName}</span>` : ''}
              <span class="head-badge">Code: ${String(emp.id).padStart(6, '0')}</span>
            </div>
          </div>

          <div class="modal-body">

            ${!this._loading ? html`
              <div class="section">
                <div class="section-title">Deze week</div>
                <div class="stats-row">
                  <div class="stat-card">
                    <div class="stat-val accent">${totalHours.toFixed(1)}</div>
                    <div class="stat-lbl">Uren ingepland</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-val">${empShifts.length}</div>
                    <div class="stat-lbl">Diensten</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-val">${empShifts.length > 0 ? (totalHours / empShifts.length).toFixed(1) : '-'}</div>
                    <div class="stat-lbl">Gem. per dienst</div>
                  </div>
                </div>
              </div>

              ${empShifts.length > 0 ? html`
                <div class="section">
                  <div class="section-title">Diensten</div>
                  ${empShifts.map(s => html`
                    <div class="shift-row">
                      <div class="shift-dot" style="background:${color}"></div>
                      <div class="shift-date">${DAYS[new Date(s.date).getDay()]} ${this._fmtDate(s.date)}</div>
                      <div class="shift-time">${s.startTime.slice(0,5)} - ${s.endTime.slice(0,5)}</div>
                      <div class="shift-hrs">${diffHours(s.startTime, s.endTime).toFixed(1)}u</div>
                    </div>
                  `)}
                </div>
              ` : ''}

              <hr class="divider">
            ` : ''}

            <div class="section">
              <div class="section-title">Verlof</div>
              ${this._loading ? html`<p class="empty-note">Laden...</p>` : html`
                <div class="leave-pills">
                  <span class="leave-pill pill-total">${UmbrellaIcon(12)} ${this._leave.length} totaal</span>
                  ${pending  > 0 ? html`<span class="leave-pill pill-pending">${pending} openstaand</span>`  : ''}
                  ${approved > 0 ? html`<span class="leave-pill pill-approved">${approved} goedgekeurd</span>` : ''}
                  ${rejected > 0 ? html`<span class="leave-pill pill-rejected">${rejected} afgewezen</span>`  : ''}
                </div>
                ${this._leave.length === 0
                  ? html`<p class="empty-note">Geen verlofaanvragen.</p>`
                  : this._leave.slice(0, 10).map(r => html`
                    <div class="leave-card ${r.status.toLowerCase()}">
                      <div class="leave-head">
                        <div class="leave-dates">
                          ${this._fmtDate(r.startDate)}${r.startDate !== r.endDate ? ` - ${this._fmtDate(r.endDate)}` : ''}
                        </div>
                        <span class="leave-status-badge">${this._statusLabel(r.status)}</span>
                      </div>
                      <div class="leave-reason">${r.reason}</div>
                      ${r.rejectionReason ? html`<div class="leave-rejection">Afwijzing: ${r.rejectionReason}</div>` : ''}
                    </div>
                  `)
                }
              `}
            </div>

          </div>
        </div>
      </div>
    `;
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }
}

customElements.define('employee-detail-modal', EmployeeDetailModal);
