import { LitElement, html, css } from 'lit';
import { getAllLeaveRequests, approveLeaveRequest, rejectLeaveRequest } from '../api.js';
import { CheckIcon, XIcon, AlertIcon, InboxIcon, ClockIcon, UserIcon, ArrowRightIcon } from '../icons.js';

class LeaveRequestsManager extends LitElement {
  static properties = {
    _requests:     { state: true },
    _loading:      { state: true },
    _rejectModal:  { state: true },
    _rejectReason: { state: true },
    _saving:       { state: true },
    _error:        { state: true },
  };

  static styles = css`
    :host { display: block; padding: 1.25rem; max-width: 800px; margin: 0 auto; }

    .page-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.25rem;
    }
    .page-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--app-text-muted); }

    .archive-link {
      display: inline-flex; align-items: center; gap: 0.35rem;
      background: var(--app-bg-light);
      border: 1.5px solid var(--app-border);
      color: var(--app-text-dark); border-radius: 8px;
      padding: 0.5rem 1rem; font-size: 0.85rem; font-weight: 600; cursor: pointer;
      transition: all 0.15s; -webkit-tap-highlight-color: transparent;
    }
    .archive-link:hover { border-color: var(--app-accent); color: var(--app-accent); background: #fff; }

    .alert {
      display: flex; align-items: flex-start; gap: 0.5rem;
      border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1rem;
      background: #ffebee; border: 1px solid rgba(211,47,47,0.25); color: #C62828;
    }

    .employee-group { margin-bottom: 1.5rem; }
    .employee-header {
      display: flex; align-items: center; gap: 0.5rem;
      font-size: 0.88rem; font-weight: 700; color: var(--app-text-dark);
      padding: 0.55rem 0; border-bottom: 2px solid var(--app-border);
      margin-bottom: 0.55rem;
    }
    .emp-code {
      font-size: 0.7rem; background: var(--app-bg-light);
      color: var(--app-text-muted);
      border-radius: 20px; padding: 0.15rem 0.5rem; font-weight: 600; font-family: monospace;
    }

    .request-card {
      background: #fff; border: 1px solid var(--app-border);
      border-left: 3px solid #F59E0B;
      border-radius: 10px; padding: 1rem 1.15rem; margin-bottom: 0.55rem;
      display: flex; gap: 1rem; align-items: center;
    }

    .request-body { flex: 1; min-width: 0; }
    .request-dates { font-size: 0.92rem; font-weight: 700; color: var(--app-text-dark); }
    .request-reason { font-size: 0.82rem; color: var(--app-text-muted); margin-top: 0.2rem; word-break: break-word; }
    .request-meta { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem; flex-wrap: wrap; }
    .badge-time { font-size: 0.72rem; color: var(--app-text-muted); display: flex; align-items: center; gap: 0.2rem; }

    .actions { display: flex; gap: 0.35rem; flex-shrink: 0; }
    .btn-approve, .btn-reject {
      display: inline-flex; align-items: center; gap: 0.3rem;
      border: none; border-radius: 7px; padding: 0.45rem 0.8rem;
      font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.15s;
      white-space: nowrap; -webkit-tap-highlight-color: transparent;
    }
    .btn-approve { background: #D1FAE5; color: #065F46; }
    .btn-approve:hover { background: #10B981; color: #fff; }
    .btn-reject  { background: #FEE2E2; color: #991B1B; }
    .btn-reject:hover  { background: #EF4444; color: #fff; }
    .btn-approve:disabled, .btn-reject:disabled { opacity: 0.5; cursor: not-allowed; }

    /* afkeuren */
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.48);
      display: flex; align-items: flex-end; justify-content: center;
      z-index: 600; padding: 0;
    }
    @media (min-width: 560px) {
      .modal-backdrop { align-items: center; padding: 1rem; }
    }

    .modal {
      background: #fff; border-radius: 20px 20px 0 0;
      width: 100%; max-width: 480px;
      padding: 1.5rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom));
      box-shadow: 0 -4px 40px rgba(0,0,0,0.18);
    }
    @media (min-width: 560px) {
      .modal { border-radius: 16px; padding: 2rem; }
    }

    .modal-header {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;
    }
    .modal-title { font-size: 1.1rem; font-weight: 800; color: var(--app-text-dark); }
    .modal-close {
      width: 32px; height: 32px; border-radius: 8px;
      background: var(--app-bg-light); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--app-text-muted); -webkit-tap-highlight-color: transparent;
    }
    .modal-sub { font-size: 0.83rem; color: var(--app-text-muted); margin-bottom: 1.25rem; }

    .modal label {
      display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px; color: var(--app-text-muted); margin-bottom: 0.4rem;
    }
    .modal textarea {
      width: 100%; padding: 0.75rem 1rem; box-sizing: border-box;
      border: 1.5px solid var(--app-border); border-radius: 10px;
      font-size: 0.92rem; font-family: inherit; resize: vertical; min-height: 90px;
      outline: none; background: var(--app-bg-light);
      color: var(--app-text-dark); transition: border-color 0.15s, box-shadow 0.15s;
    }
    .modal textarea:focus {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12); background: #fff;
    }

    .modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem; }
    .btn-cancel {
      background: none; border: 1.5px solid var(--app-border);
      color: var(--app-text-muted); border-radius: 9px;
      padding: 0.7rem 1.2rem; font-size: 0.9rem; font-weight: 600; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-danger {
      display: inline-flex; align-items: center; gap: 0.35rem;
      background: #EF4444; color: #fff; border: none; border-radius: 9px;
      padding: 0.7rem 1.4rem; font-size: 0.9rem; font-weight: 700; cursor: pointer;
      transition: background 0.15s; flex: 1; justify-content: center;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-danger:hover { background: #DC2626; }
    .btn-danger:disabled { opacity: 0.55; cursor: not-allowed; }

    .empty-state { text-align: center; padding: 3rem 1rem; color: var(--app-text-muted); }
  `;

  constructor() {
    super();
    this._requests = [];
    this._loading = true;
    this._rejectModal = null;
    this._rejectReason = '';
    this._saving = false;
    this._error = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    this._loading = true;
    try {
      const all = await getAllLeaveRequests();
      this._requests = all.filter(r => r.status === 'PENDING');
    } catch { this._requests = []; }
    finally { this._loading = false; }
  }

  async _approve(id) {
    this._saving = true;
    try { await approveLeaveRequest(id); await this._load(); }
    catch (err) { this._error = err.message || 'Fout bij goedkeuren.'; }
    finally { this._saving = false; }
  }

  async _confirmReject(e) {
    e.preventDefault();
    if (!this._rejectModal) return;
    this._saving = true;
    try {
      await rejectLeaveRequest(this._rejectModal.id, this._rejectReason);
      this._rejectModal = null;
      await this._load();
    } catch (err) { this._error = err.message || 'Fout bij afwijzen.'; }
    finally { this._saving = false; }
  }

  _fmtDate(d) {
    return new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  _groupByEmployee(requests) {
    const map = new Map();
    for (const r of requests) {
      if (!map.has(r.employeeId)) map.set(r.employeeId, { name: r.employeeName, code: r.employeeCode, items: [] });
      map.get(r.employeeId).items.push(r);
    }
    return [...map.values()];
  }

  render() {
    const groups = this._groupByEmployee(this._requests);

    return html`
      <div class="page-header">
        <span class="page-title">Openstaand (${this._requests.length})</span>
        <button class="archive-link"
          @click=${() => this.dispatchEvent(new CustomEvent('show-archive', { bubbles: true, composed: true }))}>
          Archief ${ArrowRightIcon(13)}
        </button>
      </div>

      ${this._error ? html`<div class="alert">${AlertIcon(15)} ${this._error}</div>` : ''}

      ${this._loading ? html`<p style="color:var(--app-text-muted,#626B74)">Laden...</p>` : ''}

      ${!this._loading && groups.length === 0 ? html`
        <div class="empty-state">
          ${InboxIcon(40)}
          <p>Geen openstaande verlofaanvragen.</p>
        </div>
      ` : ''}

      ${groups.map(g => html`
        <div class="employee-group">
          <div class="employee-header">
            ${UserIcon(14)} ${g.name}
            <span class="emp-code">${g.code}</span>
          </div>
          ${g.items.map(r => html`
            <div class="request-card">
              <div class="request-body">
                <div class="request-dates">
                  ${this._fmtDate(r.startDate)}
                  ${r.startDate !== r.endDate ? html` &ndash; ${this._fmtDate(r.endDate)}` : ''}
                </div>
                <div class="request-reason">${r.reason}</div>
                <div class="request-meta">
                  <span class="badge-time">${ClockIcon(11)} ${new Date(r.createdAt).toLocaleDateString('nl-NL')}</span>
                </div>
              </div>
              <div class="actions">
                <button class="btn-approve" @click=${() => this._approve(r.id)} ?disabled=${this._saving}>
                  ${CheckIcon(13)} Goed
                </button>
                <button class="btn-reject"
                  @click=${() => { this._rejectModal = r; this._rejectReason = ''; }}
                  ?disabled=${this._saving}>
                  ${XIcon(13)} Wijs af
                </button>
              </div>
            </div>
          `)}
        </div>
      `)}

      ${this._rejectModal ? html`
        <div class="modal-backdrop" @click=${(e) => e.target === e.currentTarget && (this._rejectModal = null)}>
          <div class="modal">
            <div class="modal-header">
              <span class="modal-title">Aanvraag afwijzen</span>
              <button class="modal-close" @click=${() => this._rejectModal = null}>${XIcon(14)}</button>
            </div>
            <p class="modal-sub">
              ${this._rejectModal.employeeName} &bull;
              ${this._fmtDate(this._rejectModal.startDate)}
              ${this._rejectModal.startDate !== this._rejectModal.endDate
                ? html` &ndash; ${this._fmtDate(this._rejectModal.endDate)}` : ''}
            </p>
            <form @submit=${this._confirmReject}>
              <label>Reden voor afwijzing</label>
              <textarea
                placeholder="Geef een reden op voor de medewerker..."
                .value=${this._rejectReason}
                @input=${(e) => this._rejectReason = e.target.value}
                required
                autofocus
              ></textarea>
              <div class="modal-actions">
                <button type="button" class="btn-cancel" @click=${() => this._rejectModal = null}>Annuleren</button>
                <button type="submit" class="btn-danger" ?disabled=${this._saving}>
                  ${XIcon(14)} Afwijzen
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('leave-requests-manager', LeaveRequestsManager);
