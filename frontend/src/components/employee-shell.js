import { LitElement, html, css } from 'lit';
import { authStore } from '../store.js';
import { themeStore } from '../themeStore.js';
import { base } from '../ui.js';
import { CalendarIcon, UserIcon, UmbrellaIcon, SunIcon, MoonIcon } from '../icons.js';
import './employee-dashboard.js';
import './profile-page.js';
import './leave-request-page.js';
import './leave-archive-page.js';
import './notification-bell.js';

class EmployeeShell extends LitElement {
  static properties = { _page: { state: true }, _dark: { state: true } };

  static styles = [base, css`
    :host { display: flex; flex-direction: column; min-height: 100vh; }

    header { background: var(--app-bg-main); border-bottom: 1px solid var(--app-border); position: sticky; top: 0; z-index: 100; }
    .bar { max-width: 1080px; margin: 0 auto; display: flex; align-items: center; gap: 0.25rem; height: 52px; padding: 0 1.5rem; }

    .brand { display: flex; align-items: center; gap: 0.5rem; margin-right: 1.5rem; }
    .brand img { width: 22px; height: 22px; border-radius: 5px; }
    .brand span { font-weight: 700; font-size: 0.95rem; }

    nav { display: flex; height: 100%; flex: 1; }
    nav a {
      display: flex; align-items: center; height: 100%; padding: 0 0.7rem; cursor: pointer;
      color: var(--app-text-muted); font-size: 0.9rem; text-decoration: none;
      border-bottom: 2px solid transparent; border-top: 2px solid transparent;
    }
    nav a:hover { color: var(--app-text-dark); }
    nav a.active { color: var(--app-text-dark); font-weight: 700; border-bottom-color: var(--app-text-dark); }

    .who { font-size: 0.88rem; color: var(--app-text-muted); margin: 0 0.4rem; }
    .out { font: inherit; font-size: 0.88rem; color: var(--app-text-muted); background: none; border: none; cursor: pointer; padding: 0 0.25rem; }
    .out:hover { color: var(--app-text-dark); text-decoration: underline; }

    main { flex: 1; }
    .bottom-nav { display: none; }

    @media (max-width: 760px) {
      .bar { padding: 0 0.5rem 0 1rem; }
      nav, .who, .out { display: none; }
      .brand { flex: 1; margin: 0; }
      main { padding-bottom: 60px; }
      .bottom-nav {
        display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
        background: var(--app-bg-main); border-top: 1px solid var(--app-border);
        padding-bottom: env(safe-area-inset-bottom);
      }
      .bn-btn {
        flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.1rem;
        font: inherit; font-size: 0.7rem; background: none; border: none;
        color: var(--app-text-muted); padding: 0.45rem 0.25rem 0.4rem; cursor: pointer;
      }
      .bn-btn.active { color: var(--app-accent); font-weight: 700; }
    }
  `];

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

  _go(page) { this._page = page; window.scrollTo(0, 0); }

  render() {
    const pages = [
      { id: 'rooster', label: 'Rooster', icon: CalendarIcon },
      { id: 'verlof',  label: 'Verlof',  icon: UmbrellaIcon },
      { id: 'profiel', label: 'Profiel', icon: UserIcon },
    ];
    const active = this._page === 'archief' ? 'verlof' : this._page;

    return html`
      <header>
        <div class="bar">
          <div class="brand"><img src="/logo.png" alt=""><span>Rooster</span></div>
          <nav>
            ${pages.map(p => html`<a class=${active === p.id ? 'active' : ''} @click=${() => this._go(p.id)}>${p.label}</a>`)}
          </nav>
          <span class="who">${authStore.user?.fullName}</span>
          <notification-bell @navigate=${(e) => this._go(e.detail.page)}></notification-bell>
          <button class="icon-btn" @click=${() => themeStore.toggle()} title="${this._dark ? 'Licht thema' : 'Donker thema'}">
            ${this._dark ? SunIcon(16) : MoonIcon(16)}
          </button>
          <button class="out" @click=${() => authStore.logout()}>Uitloggen</button>
        </div>
      </header>

      <main>
        ${this._page === 'rooster' ? html`<employee-dashboard></employee-dashboard>` : ''}
        ${this._page === 'verlof'  ? html`<leave-request-page @show-archive=${() => this._go('archief')}></leave-request-page>` : ''}
        ${this._page === 'archief' ? html`<leave-archive-page role="employee" @back=${() => this._go('verlof')}></leave-archive-page>` : ''}
        ${this._page === 'profiel' ? html`<profile-page></profile-page>` : ''}
      </main>

      <div class="bottom-nav">
        ${pages.map(p => html`
          <button class="bn-btn ${active === p.id ? 'active' : ''}" @click=${() => this._go(p.id)}>${p.icon(19)}${p.label}</button>
        `)}
      </div>
    `;
  }
}

customElements.define('employee-shell', EmployeeShell);
