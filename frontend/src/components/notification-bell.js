import { LitElement, html, css } from 'lit';
import { getNotifications, getUnreadCount, markNotificationsRead } from '../api.js';
import { BellIcon } from '../icons.js';
import { base } from '../ui.js';

class NotificationBell extends LitElement {
  static properties = {
    side: { reflect: true },
    _open: { state: true },
    _count: { state: true },
    _items: { state: true },
    _loading: { state: true },
  };

  static styles = [base, css`
    :host { position: relative; display: inline-block; }

    .icon-btn { position: relative; color: var(--bell-color, var(--app-text-muted)); }
    .icon-btn:hover, .icon-btn.open { background: var(--bell-hover, var(--app-icon-btn-hover)); color: var(--bell-active, var(--app-text-dark)); }
    .count {
      position: absolute; top: 2px; right: 1px; min-width: 16px; height: 16px; padding: 0 4px;
      border-radius: 8px; background: var(--app-discount); color: #fff;
      font-size: 0.65rem; font-weight: 700; line-height: 16px; text-align: center;
    }

    .dropdown {
      position: absolute; top: calc(100% + 6px); right: 0; z-index: 200;
      width: 320px; max-width: calc(100vw - 1.5rem);
      background: var(--app-bg-main); border: 1px solid var(--app-border);
      border-radius: var(--radius-lg); box-shadow: var(--app-shadow-dropdown);
    }
    :host([side="left"]) .dropdown { right: auto; left: 0; }

    .head { padding: 0.65rem 0.9rem; border-bottom: 1px solid var(--app-border); font-weight: 700; font-size: 0.9rem; }
    .list { max-height: 360px; overflow-y: auto; }
    .item {
      display: block; width: 100%; text-align: left; font: inherit; color: inherit;
      background: none; border: none; border-bottom: 1px solid var(--app-border);
      padding: 0.65rem 0.9rem; cursor: pointer;
    }
    .item:last-child { border-bottom: none; }
    .item:hover { background: var(--app-card-header); }
    .item.unread { background: var(--app-notif-unread); }
    .title { font-weight: 700; font-size: 0.88rem; }
    .msg { font-size: 0.85rem; color: var(--app-text-muted); }
    .time { font-size: 0.75rem; color: var(--app-text-muted); margin-top: 0.15rem; }
    .none { padding: 1.25rem 0.9rem; font-size: 0.88rem; color: var(--app-text-muted); }
  `];

  constructor() {
    super();
    this._open = false;
    this._count = 0;
    this._items = [];
    this._loading = false;
    this._timer = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchCount();
    this._timer = setInterval(() => this._fetchCount(), 30000);
    document.addEventListener('pointerdown', this._onOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
    document.removeEventListener('pointerdown', this._onOutside);
  }

  _onOutside = (e) => {
    if (this._open && !e.composedPath().includes(this)) this._open = false;
  };

  async _fetchCount() {
    try {
      const data = await getUnreadCount();
      this._count = data.count || 0;
    } catch {}
  }

  async _toggle() {
    this._open = !this._open;
    if (!this._open) return;
    this._loading = true;
    try {
      this._items = await getNotifications();
      if (this._count > 0) {
        await markNotificationsRead();
        this._count = 0;
      }
    } catch {} finally { this._loading = false; }
  }

  _goto(n) {
    this._open = false;
    if (n.type?.startsWith('LEAVE')) {
      this.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'verlof' }, bubbles: true, composed: true }));
    }
  }

  _ago(dt) {
    const mins = Math.floor((Date.now() - new Date(dt).getTime()) / 60000);
    if (mins < 1) return 'net';
    if (mins < 60) return `${mins} min geleden`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} uur geleden`;
    const days = Math.floor(hrs / 24);
    return days === 1 ? 'gisteren' : `${days} dagen geleden`;
  }

  render() {
    return html`
      <button class="icon-btn ${this._open ? 'open' : ''}" @click=${this._toggle} title="Meldingen">
        ${BellIcon(17)}
        ${this._count > 0 ? html`<span class="count">${this._count > 9 ? '9+' : this._count}</span>` : ''}
      </button>

      ${this._open ? html`
        <div class="dropdown">
          <div class="head">Meldingen</div>
          <div class="list">
            ${this._loading && this._items.length === 0 ? html`<div class="none">Laden...</div>`
              : this._items.length === 0 ? html`<div class="none">Nog geen meldingen.</div>`
              : this._items.map(n => html`
                <button class="item ${n.read ? '' : 'unread'}" @click=${() => this._goto(n)}>
                  <div class="title">${n.title}</div>
                  <div class="msg">${n.message}</div>
                  <div class="time">${this._ago(n.createdAt)}</div>
                </button>
              `)}
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('notification-bell', NotificationBell);
