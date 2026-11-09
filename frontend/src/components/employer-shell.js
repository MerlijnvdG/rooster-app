import { LitElement, html, css } from 'lit';
import { authStore } from '../store.js';
import { themeStore } from '../themeStore.js';
import { getAllLeaveRequests } from '../api.js';
import { base } from '../ui.js';
import { CalendarIcon, UsersIcon, UserIcon, InboxIcon, ClockIcon, MapPinIcon } from '../icons.js';
import './schedule-page.js';
import './users-page.js';
import './profile-page.js';
import './leave-requests-manager.js';
import './leave-archive-page.js';
import './notification-bell.js';
import './monthly-summary-page.js';
import './locations-page.js';

class EmployerShell extends LitElement {
  static properties = {
    _page: { state: true },
    _dark: { state: true },
    _menu: { state: true },
    _openLeave: { state: true },
  };

  static styles = [base, css`
    :host { display: grid; grid-template-columns: 224px 1fr; min-height: 100vh; }

    aside {
      position: sticky; top: 0; height: 100vh;
      display: flex; flex-direction: column;
      background: var(--app-sidebar); border-right: 1px solid var(--app-border);
      padding: 0.75rem 0.6rem;
    }

    .brand { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.25rem 1.25rem 0.5rem; }
    .brand img { width: 22px; height: 22px; border-radius: 5px; }
    .brand span { flex: 1; font-weight: 700; font-size: 0.95rem; }

    nav { display: flex; flex-direction: column; gap: 1px; }
    nav a {
      display: flex; align-items: center; gap: 0.6rem;
      padding: 0.38rem 0.5rem; border-radius: var(--radius-md); cursor: pointer;
      color: var(--app-text-muted); font-size: 0.9rem; text-decoration: none;
    }
    nav a svg { color: var(--app-text-muted); opacity: 0.8; }
    nav a:hover { background: var(--app-icon-btn-hover); color: var(--app-text-dark); }
    nav a.active { color: var(--app-text-dark); font-weight: 700; }
    nav a.active svg { color: var(--app-accent); opacity: 1; }
    .n { margin-left: auto; font-size: 0.75rem; color: var(--app-text-muted); font-variant-numeric: tabular-nums; }

    .me { margin-top: auto; position: relative; }
    .me-btn {
      display: flex; align-items: center; gap: 0.55rem; width: 100%;
      font: inherit; font-size: 0.88rem; color: var(--app-text-dark); text-align: left;
      background: none; border: none; border-radius: var(--radius-md); padding: 0.4rem 0.5rem; cursor: pointer;
    }
    .me-btn:hover { background: var(--app-icon-btn-hover); }
    .initials {
      width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--app-border); color: var(--app-text-dark); font-size: 0.68rem; font-weight: 700;
    }
    .me-btn .nm { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .me-btn .dots { color: var(--app-text-muted); letter-spacing: 1px; }

    .menu {
      position: absolute; bottom: calc(100% + 4px); left: 0; right: 0; z-index: 50;
      background: var(--app-bg-main); border: 1px solid var(--app-border); border-radius: var(--radius-md);
      box-shadow: var(--app-shadow-dropdown); padding: 0.25rem;
    }
    .menu button {
      display: block; width: 100%; text-align: left; font: inherit; font-size: 0.88rem;
      background: none; border: none; color: var(--app-text-dark); padding: 0.4rem 0.6rem; border-radius: var(--radius-sm); cursor: pointer;
    }
    .menu button:hover { background: var(--app-icon-btn-hover); }

    main { min-width: 0; }
    .topbar, .bottom-nav { display: none; }

    @media (max-width: 760px) {
      :host { display: block; }
      aside { display: none; }
      .topbar {
        display: flex; align-items: center; gap: 0.5rem; height: 50px; padding: 0 0.5rem 0 1rem;
        background: var(--app-bg-main); border-bottom: 1px solid var(--app-border); position: sticky; top: 0; z-index: 100;
      }
      .topbar .brand { flex: 1; padding: 0; }
      main { padding-bottom: 60px; }
      .bottom-nav {
        display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
        background: var(--app-bg-main); border-top: 1px solid var(--app-border);
        padding-bottom: env(safe-area-inset-bottom);
      }
      .bn-btn {
        flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.1rem;
        font: inherit; font-size: 0.68rem; background: none; border: none;
        color: var(--app-text-muted); padding: 0.45rem 0.1rem 0.4rem; cursor: pointer;
      }
      .bn-btn.active { color: var(--app-accent); font-weight: 700; }
    }
  `];

  constructor() {
    super();
    this._page = 'rooster';
    this._dark = themeStore.isDark;
    this._menu = false;
    this._openLeave = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._onTheme = () => { this._dark = themeStore.isDark; };
    this._onClick = (e) => { if (this._menu && !e.composedPath().some(el => el.classList?.contains('me'))) this._menu = false; };
    document.addEventListener('theme-change', this._onTheme);
    document.addEventListener('pointerdown', this._onClick);
    this._countLeave();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('theme-change', this._onTheme);
    document.removeEventListener('pointerdown', this._onClick);
  }

  async _countLeave() {
    try {
      const all = await getAllLeaveRequests();
      this._openLeave = all.filter(r => r.status === 'PENDING').length;
    } catch {}
  }

  _go(page) {
    this._page = page;
    this._menu = false;
    window.scrollTo(0, 0);
    if (page === 'verlof') this._countLeave();
  }

  _initials() {
    return (authStore.user?.fullName || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  render() {
    const pages = [
      { id: 'rooster',     label: 'Rooster',     icon: CalendarIcon },
      { id: 'medewerkers', label: 'Medewerkers', icon: UsersIcon },
      { id: 'verlof',      label: 'Verlof',      icon: InboxIcon },
      { id: 'uren',        label: 'Uren',        icon: ClockIcon },
      { id: 'filialen',    label: 'Filialen',    icon: MapPinIcon },
    ];
    const active = this._page === 'archief' ? 'verlof' : this._page;

    return html`
      <aside>
        <div class="brand">
          <img src="/logo.png" alt=""><span>Rooster</span>
          <notification-bell side="left" @navigate=${(e) => this._go(e.detail.page)}></notification-bell>
        </div>
        <nav>
          ${pages.map(p => html`
            <a class=${active === p.id ? 'active' : ''} @click=${() => this._go(p.id)}>
              ${p.icon(16)} ${p.label}
              ${p.id === 'verlof' && this._openLeave ? html`<span class="n">${this._openLeave}</span>` : ''}
            </a>
          `)}
        </nav>
        <div class="me">
          ${this._menu ? html`
            <div class="menu">
              <button @click=${() => this._go('profiel')}>Mijn profiel</button>
              <button @click=${() => { themeStore.toggle(); this._menu = false; }}>${this._dark ? 'Licht thema' : 'Donker thema'}</button>
              <button @click=${() => authStore.logout()}>Uitloggen</button>
            </div>
          ` : ''}
          <button class="me-btn" @click=${() => this._menu = !this._menu}>
            <span class="initials">${this._initials()}</span>
            <span class="nm">${authStore.user?.fullName}</span>
            <span class="dots">···</span>
          </button>
        </div>
      </aside>

      <div class="topbar">
        <div class="brand"><img src="/logo.png" alt=""><span>Rooster</span></div>
        <notification-bell @navigate=${(e) => this._go(e.detail.page)}></notification-bell>
      </div>

      <main>
        ${this._page === 'rooster'     ? html`<schedule-page></schedule-page>` : ''}
        ${this._page === 'medewerkers' ? html`<users-page></users-page>` : ''}
        ${this._page === 'verlof'      ? html`<leave-requests-manager @show-archive=${() => this._go('archief')} @changed=${this._countLeave}></leave-requests-manager>` : ''}
        ${this._page === 'archief'     ? html`<leave-archive-page @back=${() => this._go('verlof')}></leave-archive-page>` : ''}
        ${this._page === 'uren'        ? html`<monthly-summary-page></monthly-summary-page>` : ''}
        ${this._page === 'filialen'    ? html`<locations-page></locations-page>` : ''}
        ${this._page === 'profiel'     ? html`<profile-page></profile-page>` : ''}
      </main>

      <div class="bottom-nav">
        ${[...pages, { id: 'profiel', label: 'Profiel', icon: UserIcon }].map(p => html`
          <button class="bn-btn ${active === p.id ? 'active' : ''}" @click=${() => this._go(p.id)}>${p.icon(19)}${p.label}</button>
        `)}
      </div>
    `;
  }
}

customElements.define('employer-shell', EmployerShell);
