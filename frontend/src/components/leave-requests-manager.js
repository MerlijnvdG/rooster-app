import { LitElement, html, css } from 'lit';
import { getAllLeaveRequests, approveLeaveRequest, rejectLeaveRequest } from '../api.js';
import { XIcon } from '../icons.js';
import { base } from '../ui.js';

class LeaveRequestsManager extends LitElement {
  static properties = {
    _requests:    { state: true },
    _loading:     { state: true },
    _rejectModal: { state: true },
    _saving:      { state: true },
    _error:       { state: true },
  };

  static styles = [base, css`
    ul { list-style: none; }
    li { display: grid; grid-template-columns: 1fr auto; gap: 0.5rem 1rem; padding: 0.9rem 1rem; border-bottom: 1px solid var(--app-border); }
    li:last-child { border-bottom: none; }
    .who { font-weight: 700; }
    .dates { font-size: 0.9rem; }
    .days { font-family: var(--font-mono); font-size: 0.8rem; color: var(--app-text-muted); margin-left: 0.4rem; }
    .reason { color: var(--app-text-muted); font-size: 0.9rem; margin-top: 0.15rem; }
    .btns { display: flex; gap: 0.4rem; align-items: flex-start; }

    @media (max-width: 600px) {
      li { grid-template-columns: 1fr; }
    }
  `];

  constructor() {
    super();
    this._requests = [];
    this._loading = true;
    this._rejectModal = null;
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
      this._requests = all.filter(r => r.status === 'PENDING')
        .sort((a, b) => a.startDate.localeCompare(b.startDate));
      this.dispatchEvent(new CustomEvent('changed'));
    } catch { this._requests = []; }
    finally { this._loading = false; }
  }

  async _approve(id) {
    this._saving = true;
    try { await approveLeaveRequest(id); await this._load(); }
    catch (err) { this._error = err.message || 'Goedkeuren is niet gelukt.'; }
    finally { this._saving = false; }
  }

  async _reject(e) {
    e.preventDefault();
    this._saving = true;
    try {
      await rejectLeaveRequest(this._rejectModal.id, e.target.elements['reason'].value.trim());
      this._rejectModal = null;
      await this._load();
    } catch (err) { this._error = err.message || 'Afwijzen is niet gelukt.'; }
    finally { this._saving = false; }
  }

  _fmt(d) {
    return new Date(d).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  _days(r) {
    return Math.round((new Date(r.endDate) - new Date(r.startDate)) / 86400000) + 1;
  }

  render() {
    const r = this._rejectModal;

    return html`
      <div class="page page-narrow">
        <div class="page-head">
          <div>
            <h1>Verlof</h1>
            <div class="sub">${this._requests.length === 1 ? '1 aanvraag wacht' : `${this._requests.length} aanvragen wachten`} op antwoord</div>
          </div>
          <button class="btn btn-text" @click=${() => this.dispatchEvent(new CustomEvent('show-archive', { bubbles: true, composed: true }))}>Eerdere aanvragen</button>
        </div>

        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

        ${this._loading ? html`<div class="loading">Laden...</div>`
          : this._requests.length === 0 ? html`<div class="empty panel"><strong>Alles is beantwoord</strong>Nieuwe aanvragen komen hier te staan.</div>`
          : html`
            <ul class="panel">
              ${this._requests.map(req => html`
                <li>
                  <div>
                    <div class="who">${req.employeeName}</div>
                    <div class="dates">
                      ${this._fmt(req.startDate)}${req.startDate !== req.endDate ? ` t/m ${this._fmt(req.endDate)}` : ''}
                      <span class="days">${this._days(req)}d</span>
                    </div>
                    <div class="reason">${req.reason}</div>
                  </div>
                  <div class="btns">
                    <button class="btn" @click=${() => this._rejectModal = req} ?disabled=${this._saving}>Afwijzen</button>
                    <button class="btn btn-primary" @click=${() => this._approve(req.id)} ?disabled=${this._saving}>Goedkeuren</button>
                  </div>
                </li>
              `)}
            </ul>
          `}
      </div>

      ${r ? html`
        <div class="overlay" @click=${(e) => e.target === e.currentTarget && (this._rejectModal = null)}>
          <form class="sheet" @submit=${this._reject}>
            <div class="sheet-head">
              <h2>Verlof afwijzen</h2>
              <button type="button" class="icon-btn" @click=${() => this._rejectModal = null} title="Sluiten">${XIcon(16)}</button>
            </div>
            <div class="sheet-body">
              <p class="muted" style="margin-bottom:0.9rem">${r.employeeName}, ${this._fmt(r.startDate)}${r.startDate !== r.endDate ? ` t/m ${this._fmt(r.endDate)}` : ''}</p>
              <div class="field">
                <label for="reason">Reden</label>
                <textarea id="reason" name="reason" required></textarea>
                <span class="hint">${r.employeeName.split(' ')[0]} krijgt deze reden te zien.</span>
              </div>
            </div>
            <div class="sheet-foot">
              <button type="button" class="btn" @click=${() => this._rejectModal = null}>Annuleren</button>
              <button type="submit" class="btn btn-danger solid" ?disabled=${this._saving}>Afwijzen</button>
            </div>
          </form>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('leave-requests-manager', LeaveRequestsManager);
