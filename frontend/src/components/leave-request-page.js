import { LitElement, html, css } from 'lit';
import { createLeaveRequest, getMyLeaveRequests, deleteLeaveRequest } from '../api.js';
import { TrashIcon } from '../icons.js';
import { base } from '../ui.js';
import './confirm-modal.js';

class LeaveRequestPage extends LitElement {
  static properties = {
    _requests:     { state: true },
    _loading:      { state: true },
    _saving:       { state: true },
    _error:        { state: true },
    _success:      { state: true },
    _confirmModal: { state: true },
  };

  static styles = [base, css`
    form.panel { padding: 1.1rem 1.1rem 0.2rem; margin-bottom: 2rem; }
    form .btn-primary { margin-bottom: 1rem; }

    h2 { font-size: 1.1rem; margin-bottom: 0.5rem; }

    ul { list-style: none; }
    li { display: flex; gap: 1rem; align-items: flex-start; padding: 0.75rem 1rem; border-bottom: 1px solid var(--app-border); }
    li:last-child { border-bottom: none; }
    .info { flex: 1; min-width: 0; }
    .dates { font-weight: 700; }
    .reason { color: var(--app-text-muted); font-size: 0.9rem; }
    .sent { font-size: 0.8rem; color: var(--app-text-muted); margin-top: 0.15rem; }
  `];

  constructor() {
    super();
    this._requests = [];
    this._loading = true;
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

  async _submit(e) {
    e.preventDefault();
    this._error = ''; this._success = '';
    const f = e.target;
    const start = f.elements['startDate'].value;
    const end = f.elements['endDate'].value || start;
    if (end < start) { this._error = 'De laatste dag ligt voor de eerste dag.'; return; }
    this._saving = true;
    try {
      await createLeaveRequest({ startDate: start, endDate: end, reason: f.elements['reason'].value.trim() });
      this._success = 'Aanvraag verstuurd. Je krijgt een melding als je manager heeft gereageerd.';
      f.reset();
      await this._load();
    } catch (err) {
      this._error = err.message || 'Versturen is niet gelukt.';
    } finally { this._saving = false; }
  }

  _delete(id) {
    this._confirmModal = {
      title: 'Aanvraag intrekken?',
      onConfirm: async () => {
        this._confirmModal = null;
        try { await deleteLeaveRequest(id); await this._load(); }
        catch (err) { this._error = err.message || 'Intrekken is niet gelukt.'; }
      },
    };
  }

  _fmt(d) {
    return new Date(d).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'long' });
  }

  render() {
    return html`
      <div class="page page-narrow">
        <div class="page-head">
          <h1>Verlof</h1>
          <button class="btn btn-text" @click=${() => this.dispatchEvent(new CustomEvent('show-archive', { bubbles: true, composed: true }))}>Eerdere aanvragen</button>
        </div>

        ${this._success ? html`<div class="ok-bar">${this._success}</div>` : ''}
        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

        <form class="panel" @submit=${this._submit}>
          <div class="row">
            <div class="field">
              <label for="start">Eerste dag</label>
              <input id="start" type="date" name="startDate" required>
            </div>
            <div class="field">
              <label for="end">Laatste dag</label>
              <input id="end" type="date" name="endDate">
            </div>
          </div>
          <div class="field">
            <label for="reason">Waarom?</label>
            <textarea id="reason" name="reason" required placeholder="Bijvoorbeeld vakantie, tandarts of familie"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" ?disabled=${this._saving}>${this._saving ? 'Versturen...' : 'Verlof aanvragen'}</button>
        </form>

        <h2>Wacht op antwoord</h2>
        ${this._loading ? html`<div class="loading">Laden...</div>`
          : this._requests.length === 0 ? html`<p class="muted">Je hebt geen openstaande aanvragen.</p>`
          : html`
            <ul class="panel">
              ${this._requests.map(r => html`
                <li>
                  <div class="info">
                    <div class="dates">${this._fmt(r.startDate)}${r.startDate !== r.endDate ? html` t/m ${this._fmt(r.endDate)}` : ''}</div>
                    <div class="reason">${r.reason}</div>
                    <div class="sent">Aangevraagd op ${new Date(r.createdAt).toLocaleDateString('nl-NL')}</div>
                  </div>
                  <button class="icon-btn del" @click=${() => this._delete(r.id)} title="Intrekken">${TrashIcon(15)}</button>
                </li>
              `)}
            </ul>
          `}
      </div>

      <confirm-modal
        .open=${!!this._confirmModal}
        .title=${this._confirmModal?.title || ''}
        confirmLabel="Intrekken"
        danger
        @confirm=${() => this._confirmModal?.onConfirm?.()}
        @cancel=${() => this._confirmModal = null}
      ></confirm-modal>
    `;
  }
}

customElements.define('leave-request-page', LeaveRequestPage);
