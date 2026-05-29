import { LitElement, html, css } from 'lit';
import { base } from '../ui.js';

class ConfirmModal extends LitElement {
  static properties = {
    open:         { type: Boolean },
    title:        {},
    message:      {},
    confirmLabel: {},
    danger:       { type: Boolean },
  };

  static styles = [base, css`
    .sheet { max-width: 400px; }
    p { color: var(--app-text-muted); font-size: 0.92rem; }
  `];

  _cancel()  { this.dispatchEvent(new CustomEvent('cancel')); }
  _confirm() { this.dispatchEvent(new CustomEvent('confirm')); }

  render() {
    if (!this.open) return html``;
    return html`
      <div class="overlay" @click=${e => e.target === e.currentTarget && this._cancel()}>
        <div class="sheet" role="alertdialog">
          <div class="sheet-head"><h2>${this.title || 'Weet je het zeker?'}</h2></div>
          ${this.message ? html`<div class="sheet-body"><p>${this.message}</p></div>` : ''}
          <div class="sheet-foot">
            <button class="btn" @click=${this._cancel}>Annuleren</button>
            <button class="btn ${this.danger ? 'btn-danger solid' : 'btn-primary'}" @click=${this._confirm}>${this.confirmLabel || 'Verwijderen'}</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-modal', ConfirmModal);
