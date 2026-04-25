import { LitElement, html, css } from 'lit';
import { getNotifications, getUnreadCount, markNotificationsRead } from '../api.js';
import { BellIcon, ArrowRightIcon, UmbrellaIcon, CheckIcon, XIcon } from '../icons.js';

const TYPE_NAV = {
  LEAVE_REQUEST: 'verlof',
  LEAVE_APPROVED: 'verlof',
  LEAVE_REJECTED: 'verlof',
};

const TYPE_COLOR = {
  LEAVE_REQUEST: '#F59E0B',
  LEAVE_APPROVED: '#10B981',
  LEAVE_REJECTED: '#EF4444',
};

const TYPE_ICON = {
  LEAVE_REQUEST: UmbrellaIcon,
  LEAVE_APPROVED: CheckIcon,
  LEAVE_REJECTED: XIcon,
};

class NotificationBell extends LitElement {
  static properties = {
    _open:    { state: true },
    _count:   { state: true },
    _items:   { state: true },
    _loading: { state: true },
  };

  static styles = css`
    :host { position: relative; display: inline-flex; align-items: center; }

    .bell-btn {
      position: relative;
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted);
      width: 34px; height: 34px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, color 0.15s;
      -webkit-tap-highlight-color: transparent;
      flex-shrink: 0;
    }
    .bell-btn:hover, .bell-btn.open {
      background: var(--app-bg-light);
      color: var(--app-text-dark);
    }

    .badge {
      position: absolute; top: 0px; right: 0px;
      background: var(--app-accent); color: #fff;
      font-size: 0.58rem; font-weight: 900; border-radius: 8px;
      min-width: 15px; height: 15px; padding: 0 3px;
      display: flex; align-items: center; justify-content: center;
      line-height: 1; pointer-events: none; border: 1.5px solid #fff;
    }

    .dropdown {
      position: absolute; top: calc(100% + 10px); right: -4px;
      background: #fff;
      border: 1px solid var(--app-border);
      border-radius: 14px; width: 310px;
      max-height: 400px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.16);
      z-index: 500; overflow: hidden;
      display: flex; flex-direction: column;
    }

    @media (max-width: 420px) {
      .dropdown { right: -44px; width: 280px; }
    }

    .dd-header {
      padding: 0.9rem 1rem 0.7rem;
      border-bottom: 1px solid var(--app-border);
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: space-between;
    }
    .dd-title { font-size: 0.88rem; font-weight: 800; color: var(--app-text-dark); }
    .dd-count {
      font-size: 0.7rem; background: var(--app-accent); color: #fff;
      border-radius: 10px; padding: 0.1rem 0.5rem; font-weight: 700;
    }

    .list { overflow-y: auto; flex: 1; }

    .empty {
      padding: 2.5rem 1rem; text-align: center;
      color: var(--app-text-muted); font-size: 0.83rem;
    }

    .notif-item {
      display: flex; gap: 0.65rem; align-items: center;
      padding: 0.75rem 0.9rem;
      border-bottom: 1px solid var(--app-border);
      cursor: pointer; transition: background 0.1s;
      -webkit-tap-highlight-color: transparent;
    }
    .notif-item:last-child { border-bottom: none; }
    .notif-item.unread { background: rgba(37,99,235,0.035); }
    .notif-item:hover { background: var(--app-bg-light); }
    .notif-item:active { background: rgba(0,0,0,0.06); }

    .notif-icon-wrap {
      width: 34px; height: 34px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; color: #fff;
    }

    .notif-body { flex: 1; min-width: 0; }
    .notif-title {
      font-size: 0.82rem; font-weight: 700;
      color: var(--app-text-dark); line-height: 1.3;
    }
    .notif-msg {
      font-size: 0.75rem; color: var(--app-text-muted);
      margin-top: 0.15rem; line-height: 1.35;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .notif-time {
      font-size: 0.68rem; color: var(--app-text-muted);
      margin-top: 0.2rem;
    }

    .notif-arrow { color: var(--app-text-muted); flex-shrink: 0; }

    .unread-dot {
      position: absolute; right: 0.9rem; top: 50%; transform: translateY(-50%);
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--app-accent);
    }
  `;

  constructor() {
    super();
    this._open = false;
    this._count = 0;
    this._items = [];
    this._loading = false;
    this._intervalId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchCount();
    this._intervalId = setInterval(() => this._fetchCount(), 30000);
    document.addEventListener('pointerdown', this._onOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._intervalId);
    document.removeEventListener('pointerdown', this._onOutside);
  }

  _onOutside = (e) => {
    if (this._open && !this.shadowRoot.contains(e.composedPath()[0])) {
      this._open = false;
    }
  };

  async _fetchCount() {
    try {
      const data = await getUnreadCount();
      this._count = data.count || 0;
    } catch {}
  }

  async _toggle() {
    this._open = !this._open;
    if (this._open) {
      this._loading = true;
      try {
        this._items = await getNotifications();
        if (this._count > 0) {
          await markNotificationsRead();
          this._count = 0;
        }
      } catch {} finally { this._loading = false; }
    }
  }

  _navigate(type) {
    const page = TYPE_NAV[type] || null;
    if (!page) return;
    this._open = false;
    this.dispatchEvent(new CustomEvent('navigate', { detail: { page }, bubbles: true, composed: true }));
  }

  _relativeTime(dt) {
    const diff = Date.now() - new Date(dt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1)  return 'Zojuist';
    if (mins < 60) return `${mins}m geleden`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24)  return `${hrs}u geleden`;
    return `${Math.floor(hrs / 24)}d geleden`;
  }

  render() {
    const unreadCount = this._items.filter(n => !n.read).length;

    return html`
      <button class="bell-btn ${this._open ? 'open' : ''}" @click=${this._toggle} title="Meldingen">
        ${BellIcon(17)}
        ${this._count > 0 ? html`<span class="badge">${this._count > 9 ? '9+' : this._count}</span>` : ''}
      </button>

      ${this._open ? html`
        <div class="dropdown">
          <div class="dd-header">
            <span class="dd-title">Meldingen</span>
            ${unreadCount > 0 ? html`<span class="dd-count">${unreadCount} nieuw</span>` : ''}
          </div>
          <div class="list">
            ${this._loading ? html`<div class="empty">Laden...</div>` : ''}
            ${!this._loading && this._items.length === 0
              ? html`<div class="empty">Geen meldingen</div>` : ''}
            ${this._items.map(n => {
              const color = TYPE_COLOR[n.type] || '#626B74';
              const IconFn = TYPE_ICON[n.type];
              return html`
                <div class="notif-item ${n.read ? '' : 'unread'}" @click=${() => this._navigate(n.type)}>
                  <div class="notif-icon-wrap" style="background:${color}">
                    ${IconFn ? IconFn(15) : BellIcon(15)}
                  </div>
                  <div class="notif-body">
                    <div class="notif-title">${n.title}</div>
                    <div class="notif-msg">${n.message}</div>
                    <div class="notif-time">${this._relativeTime(n.createdAt)}</div>
                  </div>
                  <div class="notif-arrow">${ArrowRightIcon(14)}</div>
                </div>
              `;
            })}
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('notification-bell', NotificationBell);
