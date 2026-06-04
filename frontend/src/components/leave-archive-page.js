import { LitElement, html, css } from 'lit';
import { getMyLeaveRequests, getAllLeaveRequests } from '../api.js';
import { ChevronLeft } from '../icons.js';
import { authStore } from '../store.js';
import { base } from '../ui.js';

const STATUS = { APPROVED: 'Goedgekeurd', REJECTED: 'Afgewezen' };

class LeaveArchivePage extends LitElement {
  static properties = {
    _all:     { state: true },
    _loading: { state: true },
    _filter:  { state: true },
    _search:  { state: true },
  };

  static styles = [base, css`
    .back { margin: 0 0 0.5rem -0.4rem; }
    .filters { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
    .filters input { max-width: 260px; }
    .filters select { width: auto; }

    table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    th { text-align: left; font-size: 0.8rem; font-weight: 600; color: var(--app-text-muted); padding: 0.55rem 0.85rem; border-bottom: 1px solid var(--app-border); background: var(--app-card-header); }
    td { padding: 0.6rem 0.85rem; border-bottom: 1px solid var(--app-border); vertical-align: top; }
    tr:last-child td { border-bottom: none; }
    .panel { overflow: hidden; }
    .nowrap { white-space: nowrap; }
    .why { color: var(--app-text-muted); font-size: 0.85rem; }

    @media (max-width: 600px) {
      .hide-sm { display: none; }
      td, th { padding-left: 0.6rem; padding-right: 0.6rem; }
    }
  `];

  constructor() {
    super();
    this._all = [];
    this._loading = true;
    this._filter = '';
    this._search = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  get _isManager() {
    return authStore.user?.role === 'EMPLOYER';
  }

  async _load() {
    this._loading = true;
    try {
      const all = this._isManager ? await getAllLeaveRequests() : await getMyLeaveRequests();
      this._all = all.filter(r => r.status !== 'PENDING')
        .sort((a, b) => b.startDate.localeCompare(a.startDate));
    } catch { this._all = []; }
    finally { this._loading = false; }
  }

  _filtered() {
    const q = this._search.trim().toLowerCase();
    return this._all.filter(r => (!this._filter || r.status === this._filter)
      && (!q || r.employeeName.toLowerCase().includes(q)));
  }

  _fmt(d) {
    return new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  render() {
    const list = this._filtered();

    return html`
      <div class="page">
        <button class="btn btn-text back" @click=${() => this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }))}>
          ${ChevronLeft(15)} Verlof
        </button>
        <div class="page-head"><h1>Eerdere aanvragen</h1></div>

        <div class="filters">
          ${this._isManager ? html`
            <input type="search" placeholder="Zoek op naam" .value=${this._search} @input=${(e) => this._search = e.target.value}>
          ` : ''}
          <select .value=${this._filter} @change=${(e) => this._filter = e.target.value}>
            <option value="">Alles</option>
            <option value="APPROVED">Goedgekeurd</option>
            <option value="REJECTED">Afgewezen</option>
          </select>
        </div>

        ${this._loading ? html`<div class="loading">Laden...</div>`
          : list.length === 0 ? html`<div class="empty">Niks gevonden.</div>`
          : html`
            <div class="panel">
              <table>
                <thead>
                  <tr>
                    ${this._isManager ? html`<th>Medewerker</th>` : ''}
                    <th>Wanneer</th>
                    <th class="hide-sm">Reden</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${list.map(r => html`
                    <tr>
                      ${this._isManager ? html`<td><b>${r.employeeName}</b></td>` : ''}
                      <td class="nowrap">${this._fmt(r.startDate)}${r.startDate !== r.endDate ? html`<br><span class="muted">t/m ${this._fmt(r.endDate)}</span>` : ''}</td>
                      <td class="hide-sm">
                        ${r.reason}
                        ${r.rejectionReason ? html`<div class="why">Afgewezen omdat: ${r.rejectionReason}</div>` : ''}
                      </td>
                      <td><span class="status ${r.status.toLowerCase()}">${STATUS[r.status]}</span></td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `}
      </div>
    `;
  }
}

customElements.define('leave-archive-page', LeaveArchivePage);
