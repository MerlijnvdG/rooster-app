import { LitElement, html, css } from 'lit';
import { getMyLeaveRequests, getAllLeaveRequests } from '../api.js';
import { ChevronLeft, SearchIcon, CheckIcon, XIcon, ClockIcon, UserIcon } from '../icons.js';
import { authStore } from '../store.js';

const STATUS_LABEL = { APPROVED: 'Goedgekeurd', REJECTED: 'Afgewezen' };

class LeaveArchivePage extends LitElement {
  static properties = {
    _all:      { state: true },
    _loading:  { state: true },
    _filter:   { state: true },
    _search:   { state: true },
  };

  static styles = css`
    :host { display: block; padding: 1.25rem; max-width: 800px; margin: 0 auto; }

    .back-btn {
      display: inline-flex; align-items: center; gap: 0.35rem;
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted); font-size: 0.88rem; font-weight: 600;
      padding: 0; margin-bottom: 1.25rem; transition: color 0.15s;
    }
    .back-btn:hover { color: var(--app-accent); }

    .filter-row { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.1rem; }

    .search-wrap { position: relative; flex: 1; min-width: 160px; }
    .search-wrap input {
      width: 100%; padding: 0.55rem 0.9rem 0.55rem 2.2rem;
      border: 1.5px solid var(--app-border);
      border-radius: 8px; font-size: 0.88rem; outline: none; box-sizing: border-box;
      background: #fff; color: var(--app-text-dark);
      transition: border-color 0.15s;
    }
    .search-wrap input:focus { border-color: var(--app-accent); }
    .search-icon { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: var(--app-text-muted); pointer-events: none; }

    .tab {
      background: none; border: 1.5px solid var(--app-border);
      color: var(--app-text-muted); border-radius: 20px;
      padding: 0.4rem 1rem; font-size: 0.82rem; font-weight: 600; cursor: pointer;
      transition: all 0.15s; white-space: nowrap;
    }
    .tab.active { background: var(--app-accent); border-color: var(--app-accent); color: #fff; }
    .tab:hover:not(.active) { border-color: #999; color: var(--app-text-dark); }

    .empty-state { text-align: center; padding: 3rem 1rem; color: var(--app-text-muted); }

    /* manager, per medewerker */
    .employee-group { margin-bottom: 1.4rem; }
    .employee-header {
      display: flex; align-items: center; gap: 0.5rem;
      font-size: 0.88rem; font-weight: 700; color: var(--app-text-dark);
      padding: 0.5rem 0; border-bottom: 2px solid var(--app-border);
      margin-bottom: 0.5rem;
    }
    .emp-code { font-size: 0.7rem; background: var(--app-bg-light); color: var(--app-text-muted); border-radius: 20px; padding: 0.15rem 0.5rem; font-weight: 600; font-family: monospace; }
    .emp-count { font-size: 0.7rem; color: var(--app-text-muted); }

    .request-card {
      background: #fff; border: 1px solid var(--app-border);
      border-radius: 10px; padding: 0.9rem 1.15rem; margin-bottom: 0.5rem;
      display: flex; gap: 0.85rem; align-items: flex-start;
    }
    .request-card.approved { border-left: 3px solid #10B981; }
    .request-card.rejected { border-left: 3px solid #EF4444; }

    .status-icon-wrap {
      width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; color: #fff; margin-top: 1px;
    }
    .status-icon-wrap.approved { background: #10B981; }
    .status-icon-wrap.rejected { background: #EF4444; }

    .request-body { flex: 1; min-width: 0; }
    .request-dates { font-size: 0.9rem; font-weight: 700; color: var(--app-text-dark); }
    .request-reason { font-size: 0.8rem; color: var(--app-text-muted); margin-top: 0.15rem; }
    .rejection-note { font-size: 0.78rem; color: #C62828; margin-top: 0.25rem; font-style: italic; }
    .request-meta { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.35rem; flex-wrap: wrap; }

    .badge {
      font-size: 0.7rem; font-weight: 700; padding: 0.18rem 0.5rem;
      border-radius: 20px; text-transform: uppercase; letter-spacing: 0.4px;
    }
    .badge.approved { background: #D1FAE5; color: #065F46; }
    .badge.rejected { background: #FEE2E2; color: #991B1B; }
    .badge-time { font-size: 0.72rem; color: var(--app-text-muted); display: flex; align-items: center; gap: 0.2rem; }
  `;

  constructor() {
    super();
    this._all = [];
    this._loading = true;
    this._filter = 'ALL';
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
      this._all = all.filter(r => r.status !== 'PENDING');
    } catch { this._all = []; }
    finally { this._loading = false; }
  }

  _filtered() {
    let list = this._all;
    if (this._filter !== 'ALL') list = list.filter(r => r.status === this._filter);
    if (this._search.trim() && this._isManager) {
      const q = this._search.toLowerCase();
      list = list.filter(r => r.employeeName.toLowerCase().includes(q));
    }
    return list;
  }

  _groupByEmployee(list) {
    const map = new Map();
    for (const r of list) {
      if (!map.has(r.employeeId)) map.set(r.employeeId, { name: r.employeeName, code: r.employeeCode, items: [] });
      map.get(r.employeeId).items.push(r);
    }
    return [...map.values()];
  }

  _fmtDate(d) {
    return new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  _renderCard(r) {
    const cls = r.status.toLowerCase();
    return html`
      <div class="request-card ${cls}">
        <div class="status-icon-wrap ${cls}">
          ${r.status === 'APPROVED' ? CheckIcon(14) : XIcon(14)}
        </div>
        <div class="request-body">
          <div class="request-dates">
            ${this._fmtDate(r.startDate)}
            ${r.startDate !== r.endDate ? html` &ndash; ${this._fmtDate(r.endDate)}` : ''}
          </div>
          <div class="request-reason">${r.reason}</div>
          ${r.status === 'REJECTED' && r.rejectionReason
            ? html`<div class="rejection-note">Reden: ${r.rejectionReason}</div>` : ''}
          <div class="request-meta">
            <span class="badge ${cls}">${STATUS_LABEL[r.status]}</span>
            <span class="badge-time">${ClockIcon(11)} ${new Date(r.createdAt).toLocaleDateString('nl-NL')}</span>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const filtered = this._filtered();
    const groups = this._isManager ? this._groupByEmployee(filtered) : null;

    return html`
      <button class="back-btn" @click=${() => this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }))}>
        ${ChevronLeft(16)} Terug
      </button>

      <div class="filter-row">
        ${this._isManager ? html`
          <div class="search-wrap">
            <span class="search-icon">${SearchIcon(14)}</span>
            <input type="search" placeholder="Zoek medewerker..."
              .value=${this._search} @input=${(e) => this._search = e.target.value}>
          </div>
        ` : ''}
        ${['ALL', 'APPROVED', 'REJECTED'].map(f => html`
          <button class="tab ${this._filter === f ? 'active' : ''}" @click=${() => this._filter = f}>
            ${{ ALL: 'Alle', APPROVED: 'Goedgekeurd', REJECTED: 'Afgewezen' }[f]}
          </button>
        `)}
      </div>

      ${this._loading ? html`<p style="color:var(--app-text-muted,#626B74)">Laden...</p>` : ''}

      ${!this._loading && filtered.length === 0
        ? html`<div class="empty-state"><p>Geen resultaten gevonden.</p></div>` : ''}

      ${this._isManager
        ? groups.map(g => html`
            <div class="employee-group">
              <div class="employee-header">
                ${UserIcon(14)} ${g.name}
                <span class="emp-code">${g.code}</span>
                <span class="emp-count">${g.items.length} aanvra${g.items.length === 1 ? 'ag' : 'gen'}</span>
              </div>
              ${g.items.map(r => this._renderCard(r))}
            </div>
          `)
        : filtered.map(r => this._renderCard(r))
      }
    `;
  }
}

customElements.define('leave-archive-page', LeaveArchivePage);
