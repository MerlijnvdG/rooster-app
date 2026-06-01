import { LitElement, html, css } from 'lit';
import { getLeaveRequestsForEmployee, getShiftsForEmployee } from '../api.js';
import { XIcon } from '../icons.js';
import { diffHours, getMonday, addDays, toISO } from '../date-utils.js';
import { base } from '../ui.js';

const DAYS = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
const STATUS = { PENDING: 'Open', APPROVED: 'Goedgekeurd', REJECTED: 'Afgewezen' };

class EmployeeDetailModal extends LitElement {
  static properties = {
    employee: {},
    open:     { type: Boolean },
    _shifts:  { state: true },
    _leave:   { state: true },
    _loading: { state: true },
  };

  static styles = [base, css`
    .sheet { max-width: 480px; }
    .meta { font-size: 0.85rem; color: var(--app-text-muted); padding: 0 1.25rem; }

    h3 { font-size: 0.95rem; margin: 1.1rem 0 0.4rem; display: flex; justify-content: space-between; align-items: baseline; }
    h3 span { font-family: var(--font-body); font-size: 0.82rem; font-weight: 400; color: var(--app-text-muted); }

    ul { list-style: none; }
    li { display: flex; gap: 0.75rem; align-items: baseline; padding: 0.4rem 0; border-bottom: 1px solid var(--app-border); font-size: 0.9rem; }
    li:last-child { border-bottom: none; }
    .d { width: 4.5rem; color: var(--app-text-muted); }
    .t { flex: 1; }
    .reason { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .none { font-size: 0.88rem; color: var(--app-text-muted); padding: 0.3rem 0; }
  `];

  constructor() {
    super();
    this._shifts = [];
    this._leave = [];
    this._loading = false;
  }

  updated(changed) {
    if (changed.has('open') && this.open && this.employee) this._loadData();
  }

  async _loadData() {
    this._loading = true;
    const mon = getMonday(0);
    try {
      [this._shifts, this._leave] = await Promise.all([
        getShiftsForEmployee(this.employee.id, toISO(mon), toISO(addDays(mon, 6))),
        getLeaveRequestsForEmployee(this.employee.id),
      ]);
    } catch {
      this._shifts = [];
      this._leave = [];
    } finally {
      this._loading = false;
    }
  }

  _fmt(d) {
    return new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.open || !this.employee) return html``;
    const emp = this.employee;
    const shifts = [...this._shifts].sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
    const hours = shifts.reduce((t, s) => t + diffHours(s.startTime, s.endTime), 0);

    return html`
      <div class="overlay" @click=${e => e.target === e.currentTarget && this._close()}>
        <div class="sheet">
          <div class="sheet-head">
            <h2>${emp.name}</h2>
            <button class="icon-btn" @click=${this._close} title="Sluiten">${XIcon(16)}</button>
          </div>
          <div class="meta">${emp.role === 'EMPLOYER' ? 'Manager' : 'Medewerker'}, code <span class="mono">${String(emp.id).padStart(6, '0')}</span></div>

          <div class="sheet-body">
            ${this._loading ? html`<div class="loading">Laden...</div>` : html`
              <h3>Deze week <span class="mono">${hours.toFixed(1)} uur</span></h3>
              ${shifts.length === 0 ? html`<div class="none">Niet ingepland.</div>` : html`
                <ul>
                  ${shifts.map(s => html`
                    <li>
                      <span class="d">${DAYS[new Date(s.date).getDay()]} ${new Date(s.date).getDate()}</span>
                      <span class="t mono">${s.startTime.slice(0, 5)}-${s.endTime.slice(0, 5)}</span>
                      <span class="muted">${s.locationName}</span>
                    </li>
                  `)}
                </ul>
              `}

              <h3>Verlof</h3>
              ${this._leave.length === 0 ? html`<div class="none">Nog nooit verlof aangevraagd.</div>` : html`
                <ul>
                  ${this._leave.slice(0, 8).map(r => html`
                    <li>
                      <span class="d">${this._fmt(r.startDate)}</span>
                      <span class="reason" title=${r.reason}>${r.reason}</span>
                      <span class="status ${r.status.toLowerCase()}">${STATUS[r.status]}</span>
                    </li>
                  `)}
                </ul>
              `}
            `}
          </div>
          <div class="sheet-foot"><button class="btn" @click=${this._close}>Sluiten</button></div>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-detail-modal', EmployeeDetailModal);
