import { LitElement, html, css } from 'lit';
import { createLeaveRequest, getMyLeaveRequests, deleteLeaveRequest } from '../api.js';
import { PlusIcon, TrashIcon, CheckIcon, AlertIcon, ClockIcon, UmbrellaIcon, ArrowRightIcon, XIcon } from '../icons.js';
import './confirm-modal.js';

class LeaveRequestPage extends LitElement {
  static properties = {
    _requests:     { state: true },
    _loading:      { state: true },
    _showForm:     { state: true },
    _saving:       { state: true },
    _error:        { state: true },
    _success:      { state: true },
    _confirmModal: { state: true },
  };

  static styles = css`
    :host { display: block; padding: 1.25rem; max-width: 680px; margin: 0 auto; }

    .toolbar {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .archive-btn {
      display: inline-flex; align-items: center; gap: 0.35rem;
      background: var(--app-bg-light);
      border: 1.5px solid var(--app-border);
      color: var(--app-text-dark); border-radius: 8px;
      padding: 0.5rem 1rem; font-size: 0.85rem; font-weight: 600; cursor: pointer;
      transition: all 0.15s; -webkit-tap-highlight-color: transparent;
    }
    .archive-btn:hover { border-color: var(--app-accent); color: var(--app-accent); background: var(--app-bg-main); }

    .btn-new {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: var(--app-accent); color: #fff;
      border: none; border-radius: 8px; padding: 0.55rem 1.1rem;
      font-size: 0.88rem; font-weight: 700; cursor: pointer;
      transition: background 0.15s; -webkit-tap-highlight-color: transparent;
    }
    .btn-new:hover { background: #1D4ED8; }

    /* modal */
    .modal-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.48);
      display: flex; align-items: flex-end; justify-content: center;
      z-index: 600; padding: 0;
    }
    @media (min-width: 560px) {
      .modal-backdrop { align-items: center; padding: 1rem; }
    }

    .modal {
      background: var(--app-bg-main);
      border-radius: 20px 20px 0 0;
      width: 100%; max-width: 520px;
      padding: 1.5rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom));
      box-shadow: 0 -4px 40px rgba(0,0,0,0.18);
    }
    @media (min-width: 560px) {
      .modal { border-radius: 16px; padding: 2rem; }
    }

    .modal-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    .modal-title { font-size: 1.15rem; font-weight: 800; color: var(--app-text-dark); }
    .modal-close {
      width: 32px; height: 32px; border-radius: 8px;
      background: var(--app-bg-light); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--app-text-muted); transition: background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .modal-close:hover { background: var(--app-border); }

    .date-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.1rem; }
    @media (max-width: 400px) { .date-row { grid-template-columns: 1fr; } }

    .field { display: flex; flex-direction: column; gap: 0.4rem; }
    label {
      font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px; color: var(--app-text-muted);
    }

    input[type="date"], textarea {
      padding: 0.75rem 1rem;
      border: 1.5px solid var(--app-border);
      border-radius: 10px; font-size: 0.95rem; outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      background: var(--app-bg-light);
      color: var(--app-text-dark);
      width: 100%; box-sizing: border-box;
      -webkit-appearance: none;
    }
    input[type="date"]:focus, textarea:focus {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
      background: var(--app-bg-main);
    }

    textarea {
      resize: vertical; min-height: 90px;
      font-family: inherit; font-size: 0.92rem;
      margin-bottom: 1.1rem;
    }

    .alert {
      display: flex; align-items: flex-start; gap: 0.5rem;
      border-radius: 9px; padding: 0.75rem 1rem;
      font-size: 0.84rem; margin-bottom: 1rem;
    }
    .alert.error   { background: var(--app-discount-light); border: 1px solid rgba(211,47,47,0.2); color: var(--app-discount); }
    .alert.success { background: var(--app-success-light); border: 1px solid rgba(56,142,60,0.2); color: var(--app-success); }

    .modal-actions {
      display: flex; gap: 0.75rem; justify-content: flex-end;
      padding-top: 0.25rem;
    }
    .btn-cancel {
      background: none; border: 1.5px solid var(--app-border);
      color: var(--app-text-muted); border-radius: 9px;
      padding: 0.7rem 1.2rem; font-size: 0.9rem; font-weight: 600; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-submit {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: var(--app-accent); color: #fff;
      border: none; border-radius: 9px; padding: 0.7rem 1.4rem;
      font-size: 0.9rem; font-weight: 700; cursor: pointer;
      transition: background 0.15s; -webkit-tap-highlight-color: transparent;
      flex: 1;
    }
    .btn-submit:hover:not(:disabled) { background: #1D4ED8; }
    .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }

    /* lijst */
    .section-title {
      font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px; color: var(--app-text-muted);
      margin-bottom: 0.6rem;
    }

    .empty-state {
      text-align: center; padding: 3rem 1rem;
      color: var(--app-text-muted);
    }

    .request-card {
      background: var(--app-bg-main); border: 1px solid var(--app-border);
      border-left: 3px solid #F59E0B;
      border-radius: 10px; padding: 1rem 1.15rem; margin-bottom: 0.55rem;
      display: flex; gap: 1rem; align-items: center;
    }

    .request-body { flex: 1; min-width: 0; }
    .request-dates { font-size: 0.92rem; font-weight: 700; color: var(--app-text-dark); }
    .request-reason { font-size: 0.82rem; color: var(--app-text-muted); margin-top: 0.15rem; }
    .request-meta { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem; flex-wrap: wrap; }

    .badge {
      font-size: 0.68rem; font-weight: 700; padding: 0.18rem 0.5rem;
      border-radius: 20px; text-transform: uppercase; letter-spacing: 0.4px;
      background: var(--app-warning-light); color: var(--app-warning);
    }
    .badge-time {
      font-size: 0.72rem; color: var(--app-text-muted);
      display: flex; align-items: center; gap: 0.2rem;
    }

    .btn-delete {
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted); padding: 0.35rem;
      border-radius: 6px; display: flex; align-items: center; flex-shrink: 0;
      transition: color 0.15s, background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-delete:hover { color: #EF4444; background: #FEE2E2; }
  `;

  constructor() {
    super();
    this._requests = [];
    this._loading = true;
    this._showForm = false;
    this._saving = false;
    this._error = '';
    this._success = '';
    this._confirmModal = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    this._loading = true;
    try {
      const all = await getMyLeaveRequests();
      this._requests = all.filter(r => r.status === 'PENDING');
    } catch { this._requests = []; }
    finally { this._loading = false; }
  }

  _openForm() {
    this._showForm = true;
    this._error = '';
    this._success = '';
  }

  _closeForm() {
    this._showForm = false;
    this._error = '';
    this.shadowRoot.querySelector('form')?.reset();
  }

  async _submit(e) {
    e.preventDefault();
    this._error = '';
    this._saving = true;
    const f = e.target;
    const start = f.elements['startDate'].value;
    const end   = f.elements['endDate'].value;
    if (end < start) {
      this._error = 'Einddatum mag niet voor startdatum liggen.';
      this._saving = false;
      return;
    }
    try {
      await createLeaveRequest({ startDate: start, endDate: end, reason: f.elements['reason'].value.trim() });
      this._success = 'Verlofaanvraag ingediend!';
      this._showForm = false;
      await this._load();
    } catch (err) {
      this._error = err.message || 'Fout bij indienen.';
    } finally { this._saving = false; }
  }

  _delete(id) {
    this._confirmModal = {
      title: 'Aanvraag verwijderen?',
      message: 'De verlofaanvraag wordt definitief verwijderd.',
      confirmLabel: 'Verwijderen',
      onConfirm: async () => {
        this._confirmModal = null;
        try { await deleteLeaveRequest(id); await this._load(); }
        catch (err) { this._error = err.message || 'Kon aanvraag niet verwijderen.'; }
      },
    };
  }

  _fmtDate(d) {
    return new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  render() {
    return html`
      <div class="toolbar">
        <button class="archive-btn"
          @click=${() => this.dispatchEvent(new CustomEvent('show-archive', { bubbles: true, composed: true }))}>
          Archief ${ArrowRightIcon(13)}
        </button>
        <button class="btn-new" @click=${this._openForm}>
          ${PlusIcon(15)} Nieuw
        </button>
      </div>

      ${this._success ? html`<div class="alert success">${CheckIcon(15)} ${this._success}</div>` : ''}

      ${this._loading ? html`<p style="color:var(--app-text-muted,#626B74)">Laden...</p>` : ''}

      ${!this._loading && this._requests.length === 0 ? html`
        <div class="empty-state">
          ${UmbrellaIcon(40)}
          <p>Geen openstaande verlofaanvragen.<br>Druk op "Nieuw" om verlof aan te vragen.</p>
        </div>
      ` : ''}

      ${this._requests.length > 0 ? html`
        <div class="section-title">Openstaand (${this._requests.length})</div>
      ` : ''}

      ${this._requests.map(r => html`
        <div class="request-card">
          <div class="request-body">
            <div class="request-dates">
              ${this._fmtDate(r.startDate)}
              ${r.startDate !== r.endDate ? html` &ndash; ${this._fmtDate(r.endDate)}` : ''}
            </div>
            <div class="request-reason">${r.reason}</div>
            <div class="request-meta">
              <span class="badge">In behandeling</span>
              <span class="badge-time">${ClockIcon(11)} ${new Date(r.createdAt).toLocaleDateString('nl-NL')}</span>
            </div>
          </div>
          <button class="btn-delete" @click=${() => this._delete(r.id)} title="Verwijderen">
            ${TrashIcon(15)}
          </button>
        </div>
      `)}

      ${this._showForm ? html`
        <div class="modal-backdrop" @click=${(e) => e.target === e.currentTarget && this._closeForm()}>
          <div class="modal">
            <div class="modal-header">
              <span class="modal-title">Verlof aanvragen</span>
              <button class="modal-close" @click=${this._closeForm}>${XIcon(14)}</button>
            </div>

            ${this._error ? html`<div class="alert error">${AlertIcon(15)} ${this._error}</div>` : ''}

            <form @submit=${this._submit}>
              <div class="date-row">
                <div class="field">
                  <label>Startdatum</label>
                  <input type="date" name="startDate" required>
                </div>
                <div class="field">
                  <label>Einddatum</label>
                  <input type="date" name="endDate" required>
                </div>
              </div>
              <div class="field">
                <label>Reden</label>
                <textarea name="reason" placeholder="Omschrijf de reden voor je verlof..." required></textarea>
              </div>
              <div class="modal-actions">
                <button type="button" class="btn-cancel" @click=${this._closeForm}>Annuleren</button>
                <button type="submit" class="btn-submit" ?disabled=${this._saving}>
                  ${this._saving ? 'Bezig...' : html`${CheckIcon(15)} Indienen`}
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

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

customElements.define('leave-request-page', LeaveRequestPage);
