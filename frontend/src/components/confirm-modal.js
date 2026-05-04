import { LitElement, html, css } from 'lit';
import { XIcon, TrashIcon, AlertIcon } from '../icons.js';

class ConfirmModal extends LitElement {
  static properties = {
    open:         { type: Boolean },
    title:        {},
    message:      {},
    confirmLabel: {},
    danger:       { type: Boolean },
  };

  static styles = css`
    .backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.48);
      display: flex; align-items: flex-end; justify-content: center;
      z-index: 700;
    }
    @media (min-width: 480px) {
      .backdrop { align-items: center; padding: 1rem; }
    }

    .modal {
      background: var(--app-bg-main); border-radius: 16px 16px 0 0;
      width: 100%; max-width: 400px;
      padding: 1.5rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom));
      box-shadow: 0 -4px 32px rgba(0,0,0,0.18);
    }
    @media (min-width: 480px) {
      .modal { border-radius: 14px; padding: 1.75rem; }
    }

    .modal-head {
      display: flex; align-items: flex-start; gap: 0.9rem; margin-bottom: 0.75rem;
    }
    .icon-wrap {
      width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .icon-wrap.danger { background: #FEE2E2; color: #DC2626; }
    .icon-wrap.info   { background: var(--app-warning-light); color: var(--app-warning); }

    .modal-title {
      font-size: 1rem; font-weight: 800; color: var(--app-text-dark);
      line-height: 1.25; margin-top: 0.4rem;
    }
    .modal-message {
      font-size: 0.85rem; color: var(--app-text-muted);
      margin-bottom: 1.25rem; line-height: 1.5;
    }

    .actions { display: flex; gap: 0.65rem; }
    .btn {
      flex: 1; padding: 0.75rem; border-radius: 9px; font-size: 0.9rem;
      font-weight: 700; cursor: pointer; border: none; transition: background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-cancel {
      background: var(--app-bg-light);
      color: var(--app-text-dark);
    }
    .btn-cancel:hover { background: var(--app-border); }
    .btn-danger {
      background: #EF4444; color: #fff;
    }
    .btn-danger:hover { background: #DC2626; }
  `;

  _confirm() { this.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true })); }
  _cancel()  { this.dispatchEvent(new CustomEvent('cancel',  { bubbles: true, composed: true })); }

  render() {
    if (!this.open) return html``;
    const label = this.confirmLabel || 'Verwijderen';
    return html`
      <div class="backdrop" @click=${e => e.target === e.currentTarget && this._cancel()}>
        <div class="modal">
          <div class="modal-head">
            <div class="icon-wrap ${this.danger !== false ? 'danger' : 'info'}">
              ${TrashIcon(18)}
            </div>
            <div class="modal-title">${this.title || 'Weet je het zeker?'}</div>
          </div>
          ${this.message ? html`<p class="modal-message">${this.message}</p>` : ''}
          <div class="actions">
            <button class="btn btn-cancel" @click=${this._cancel}>Annuleren</button>
            <button class="btn btn-danger" @click=${this._confirm}>${label}</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-modal', ConfirmModal);
