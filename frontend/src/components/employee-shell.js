import { LitElement, html, css } from 'lit';
import { authStore } from '../store.js';
import { themeStore } from '../themeStore.js';
import { CalendarIcon, UserIcon, LogOutIcon, UmbrellaIcon, SunIcon, MoonIcon } from '../icons.js';
import './employee-dashboard.js';
import './profile-page.js';
import './leave-request-page.js';
import './leave-archive-page.js';
import './notification-bell.js';

class EmployeeShell extends LitElement {
  static properties = { _page: { state: true }, _dark: { state: true } };

  static styles = css`
    :host { display: flex; flex-direction: column; min-height: 100vh; }

    header {
      background: var(--app-bg-main);
      border-bottom: 1px solid var(--app-border);
      display: flex; align-items: center;
      padding: 0 1.25rem; height: 60px; gap: 1rem;
      position: sticky; top: 0; z-index: 100;
      box-shadow: var(--app-shadow-header);
    }

    .brand { display: flex; align-items: center; flex: 1; }
    .brand-logo { height: 32px; width: auto; display: block; border-radius: 50%; }

    .user-area { display: flex; align-items: center; gap: 0.65rem; }

    .user-name { font-size: 0.82rem; color: var(--app-text-muted); display: none; }
    @media (min-width: 400px) { .user-name { display: block; } }

    .theme-btn {
      width: 34px; height: 34px; border-radius: 8px;
      background: var(--app-icon-btn-bg);
      border: 1.5px solid var(--app-border);
      color: var(--app-text-muted);
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 0.15s; flex-shrink: 0;
    }
    .theme-btn:hover { background: var(--app-icon-btn-hover); color: var(--app-text-dark); }

    .avatar-btn {
      width: 34px; height: 34px; border-radius: 50%;
      background: var(--app-accent); border: 2px solid transparent;
      color: #fff; font-size: 0.78rem; font-weight: 700;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: all 0.15s;
    }
    .avatar-btn:hover { opacity: 0.85; }
    .avatar-btn.active { background: var(--app-bg-main); color: var(--app-accent); border-color: var(--app-accent); }

    .logout-btn {
      background: none; border: 1.5px solid var(--app-border);
      color: var(--app-text-muted); padding: 0.4rem 0.85rem;
      border-radius: 6px; font-size: 0.8rem; cursor: pointer; transition: all 0.15s;
    }
    .logout-btn:hover { border-color: var(--app-text-muted); color: var(--app-text-dark); }

    main { flex: 1; }

    .bottom-nav {
      display: flex; position: fixed; bottom: 0; left: 0; right: 0;
      background: var(--app-bg-main); border-top: 1px solid var(--app-border);
      padding: 0.4rem 0 max(0.4rem, env(safe-area-inset-bottom));
      z-index: 100; box-shadow: var(--app-shadow-header);
    }

    main { padding-bottom: 64px; }

    .bn-btn {
      flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.15rem;
      background: none; border: none; color: var(--app-text-muted);
      font-size: 0.65rem; padding: 0.4rem 0.25rem; cursor: pointer; transition: color 0.15s;
      min-height: 48px;
    }
    .bn-btn.active { color: var(--app-accent); }
    .bn-icon { font-size: 1.25rem; line-height: 1; }
  `;

  constructor() {
    super();
    this._page = 'rooster';
    this._dark = themeStore.isDark;
  }

  connectedCallback() {
    super.connectedCallback();
    this._onTheme = () => { this._dark = themeStore.isDark; };
    document.addEventListener('theme-change', this._onTheme);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('theme-change', this._onTheme);
  }

  _toggleTheme() { themeStore.toggle(); }

  _initials() {
    return (authStore.user?.fullName || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  render() {
    const pages = [
      { id: 'rooster', label: 'Rooster', icon: CalendarIcon(18) },
      { id: 'verlof',  label: 'Verlof',  icon: UmbrellaIcon(18) },
      { id: 'profiel', label: 'Profiel', icon: UserIcon(18) },
    ];
    return html`
      <header>
        <div class="brand"><img src="/logo.png" alt="Rooster" class="brand-logo"></div>
        <div class="user-area">
          <span class="user-name">${authStore.user?.fullName}</span>
          <notification-bell @navigate=${(e) => this._page = e.detail.page}></notification-bell>
          <button class="theme-btn" @click=${this._toggleTheme} title="${this._dark ? 'Licht thema' : 'Donker thema'}">
            ${this._dark ? SunIcon(16) : MoonIcon(16)}
          </button>
          <button class="avatar-btn ${this._page === 'profiel' ? 'active' : ''}"
            @click=${() => this._page = 'profiel'}>${this._initials()}</button>
          <button class="logout-btn" @click=${() => authStore.logout()} title="Uitloggen">${LogOutIcon(15)}</button>
        </div>
      </header>

      <main>
        ${this._page === 'rooster'  ? html`<employee-dashboard></employee-dashboard>` : ''}
        ${this._page === 'verlof'   ? html`<leave-request-page @show-archive=${() => this._page = 'archief'}></leave-request-page>` : ''}
        ${this._page === 'archief'  ? html`<leave-archive-page role="employee" @back=${() => this._page = 'verlof'}></leave-archive-page>` : ''}
        ${this._page === 'profiel'  ? html`<profile-page></profile-page>` : ''}
      </main>

      <div class="bottom-nav">
        ${pages.map(p => html`
          <button class="bn-btn ${this._page === p.id ? 'active' : ''}" @click=${() => this._page = p.id}>
            <span class="bn-icon">${p.icon}</span>${p.label}
          </button>
        `)}
      </div>
    `;
  }
}

customElements.define('employee-shell', EmployeeShell);
