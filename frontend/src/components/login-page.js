import { LitElement, html, css } from 'lit';
import { loginWithCode } from '../api.js';
import { authStore } from '../store.js';
import { AlertIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, AppLogo } from '../icons.js';

class LoginPage extends LitElement {
  static properties = {
    _loading: { state: true },
    _error: { state: true },
    _pwVisible: { state: true },
  };

  static styles = css`
    :host {
      display: flex;
      min-height: 100vh;
      width: 100%;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(ellipse 55% 50% at 10% 10%, rgba(37,99,235,0.18) 0%, transparent 65%),
        radial-gradient(ellipse 50% 50% at 90% 90%, rgba(37,99,235,0.15) 0%, transparent 65%),
        radial-gradient(ellipse 40% 40% at 80% 10%, rgba(37,99,235,0.09) 0%, transparent 60%),
        radial-gradient(ellipse 45% 45% at 15% 85%, rgba(37,99,235,0.10) 0%, transparent 60%),
        linear-gradient(160deg, #09192a 0%, #0F2537 55%, #0b1e30 100%);
      box-sizing: border-box;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
    }

    .bg-rings {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .bg-rings circle {
      fill: none;
      stroke: rgba(255,255,255,0.055);
    }

    .card {
      background: var(--app-bg-main);
      border-radius: 18px;
      padding: 2.5rem 2rem;
      width: 100%;
      max-width: 380px;
      position: relative;
      z-index: 1;
      box-shadow: 0 8px 40px rgba(0,0,0,0.22);
      box-sizing: border-box;
    }

    @media (min-width: 480px) {
      .card { padding: 2.75rem 2.5rem; }
    }

    .logo-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1.25rem;
    }

    .logo-img {
      height: 72px; width: auto;
      display: block; border-radius: 50%;
    }

    h2 {
      font-size: 1.35rem; font-weight: 800;
      color: var(--app-text-dark);
      margin: 0 0 1.75rem 0;
      text-align: center;
    }

    .subtitle { display: none; }

    .field { margin-bottom: 1rem; }

    label {
      display: block;
      font-size: 0.78rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.6px;
      color: var(--app-text-muted);
      margin-bottom: 0.45rem;
    }

    input {
      width: 100%;
      padding: 0.85rem 1rem;
      border: 1.5px solid var(--app-border);
      border-radius: 10px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.18s, box-shadow 0.18s;
      color: var(--app-text-dark);
      background: var(--app-bg-light);
      -webkit-appearance: none;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    input:focus {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
      background: var(--app-bg-main);
    }

    .error {
      display: flex; align-items: center; gap: 0.5rem;
      background: var(--app-discount-light); border: 1px solid rgba(211,47,47,0.25);
      color: var(--app-discount); border-radius: 10px;
      padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1rem;
    }

    .pw-wrap { position: relative; }
    .pw-wrap input { padding-right: 3rem; }
    .pw-toggle {
      position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted); padding: 0.3rem;
      display: flex; align-items: center;
      -webkit-tap-highlight-color: transparent;
    }
    .pw-toggle:hover { color: var(--app-text-dark); }

    .btn {
      width: 100%; padding: 0.95rem;
      background: var(--app-accent); color: #fff;
      border: none; border-radius: 10px;
      font-size: 1rem; font-weight: 700; cursor: pointer;
      transition: background 0.18s, transform 0.1s;
      margin-top: 0.5rem; min-height: 52px;
      -webkit-appearance: none;
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      -webkit-tap-highlight-color: transparent;
    }

    .btn:hover:not(:disabled) { background: var(--app-accent-hover); }
    .btn:active:not(:disabled) { transform: scale(0.99); }
    .btn:disabled { opacity: 0.55; cursor: not-allowed; }

    .hint {
      margin-top: 1.5rem; padding: 0.9rem 1rem;
      background: var(--app-bg-light);
      border-radius: 10px; font-size: 0.78rem;
      color: var(--app-text-muted); line-height: 1.75;
    }
    .hint strong { display: block; color: var(--app-text-dark); font-weight: 700; margin-bottom: 0.25rem; }

    .divider {
      height: 1px;
      background: var(--app-border);
      margin: 1.75rem 0 0;
    }
  `;

  constructor() {
    super();
    this._loading = false;
    this._error = '';
    this._pwVisible = false;
  }

  async _submit(e) {
    e.preventDefault();
    this._error = '';
    this._loading = true;
    const f = e.target;
    try {
      const data = await loginWithCode(
        f.elements['code'].value.trim(),
        f.elements['password'].value
      );
      authStore.setUser(data);
    } catch {
      this._error = 'Ongeldige inlogcode of wachtwoord.';
    } finally {
      this._loading = false;
    }
  }

  render() {
    return html`
      <svg class="bg-rings" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <circle cx="180" cy="150" r="320" stroke-width="1"/>
        <circle cx="180" cy="150" r="500" stroke-width="1"/>
        <circle cx="1260" cy="750" r="280" stroke-width="1"/>
        <circle cx="1260" cy="750" r="460" stroke-width="1"/>
        <circle cx="720" cy="450" r="600" stroke-width="0.5"/>
        <line x1="0" y1="900" x2="1440" y2="0" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
        <line x1="0" y1="600" x2="1440" y2="300" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
      </svg>

      <div class="card">
        <div class="logo-wrap">
          <img class="logo-img" src="/logo.png" alt="Rooster">
        </div>

        <h2>Inloggen</h2>

        ${this._error ? html`<div class="error">${AlertIcon(15)} ${this._error}</div>` : ''}

        <form @submit=${this._submit}>
          <div class="field">
            <label>Inlogcode</label>
            <input
              name="code"
              type="text"
              inputmode="numeric"
              maxlength="6"
              placeholder="000000"
              autocomplete="username"
              required
              ?disabled=${this._loading}
            >
          </div>
          <div class="field">
            <label>Wachtwoord</label>
            <div class="pw-wrap">
              <input
                name="password"
                type=${this._pwVisible ? 'text' : 'password'}
                autocomplete="current-password"
                placeholder="••••••••"
                required
                ?disabled=${this._loading}
              >
              <button type="button" class="pw-toggle"
                @click=${() => this._pwVisible = !this._pwVisible}>
                ${this._pwVisible ? EyeOffIcon(16) : EyeIcon(16)}
              </button>
            </div>
          </div>
          <button class="btn" type="submit" ?disabled=${this._loading}>
            ${this._loading ? 'Bezig...' : html`Inloggen ${ArrowRightIcon(16)}`}
          </button>
        </form>
      </div>
    `;
  }
}

customElements.define('login-page', LoginPage);
