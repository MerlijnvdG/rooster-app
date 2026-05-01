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
      max-width: 100vw;
      overflow: hidden;
      background: var(--app-blue);
    }

    .left {
      display: none;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 2.5rem;
      background: var(--app-blue);
      position: relative;
      overflow: hidden;
    }

    .left::before {
      content: '';
      position: absolute;
      width: 400px; height: 400px; border-radius: 50%;
      background: rgba(37,99,235,0.08);
      top: -80px; right: -80px;
    }

    .left::after {
      content: '';
      position: absolute;
      width: 250px; height: 250px; border-radius: 50%;
      background: rgba(37,99,235,0.05);
      bottom: -40px; left: -40px;
    }

    @media (min-width: 720px) { .left { display: flex; } }

    .brand-big { font-size: 4rem; font-weight: 900; color: var(--app-accent); letter-spacing: -3px; }
    .brand-tagline { color: rgba(255,255,255,0.55); font-size: 1rem; margin-bottom: 2.5rem; margin-top: 0.35rem; }

    .feature-list { list-style: none; width: 100%; max-width: 280px; }
    .feature-list li {
      color: rgba(255,255,255,0.75); font-size: 0.88rem;
      padding: 0.65rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);
      display: flex; align-items: center; gap: 0.75rem;
    }
    .feature-list li::before {
      content: '✓'; width: 20px; height: 20px;
      background: rgba(37,99,235,0.25); color: var(--app-accent);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; flex-shrink: 0; text-align: center; line-height: 20px; font-weight: 700;
    }

    .right {
      flex: 0 0 100%;
      display: flex; align-items: center; justify-content: center;
      padding: 1.25rem 2rem;
      min-height: 100vh;
      background: var(--app-blue);
      box-sizing: border-box;
      overflow: hidden;
    }

    @media (min-width: 720px) { .right { flex: 0 0 440px; } }

    .card {
      background: #fff;
      border-radius: 16px;
      padding: 1.75rem 1.5rem;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      border: 1px solid var(--app-border);
      box-sizing: border-box;
    }

    .logo-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.75rem; }
    .logo-badge {
      width: 44px; height: 44px; border-radius: 12px;
      background: var(--app-blue);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .logo-text-wrap .logo-name { font-size: 1.15rem; font-weight: 800; color: var(--app-text-dark); line-height: 1.1; }
    .logo-text-wrap .logo-sub { font-size: 0.75rem; color: var(--app-text-muted); }

    h2 { font-size: 1.5rem; font-weight: 800; color: var(--app-text-dark); margin-bottom: 0.25rem; }
    .subtitle { font-size: 0.85rem; color: var(--app-text-muted); margin-bottom: 1.75rem; }

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
      background: #fff;
    }

    .error {
      display: flex; align-items: center; gap: 0.5rem;
      background: #ffebee; border: 1px solid rgba(211,47,47,0.25);
      color: #C62828; border-radius: 10px;
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
      <div class="left">
        <div class="brand-big">Rooster</div>
        <div class="brand-tagline">Roosterapp voor de filialen</div>
        <ul class="feature-list">
          <li>Weekrooster per filiaal bekijken</li>
          <li>Diensten inplannen en aanpassen</li>
          <li>Verlof aanvragen en beheren</li>
          <li>Gewerkte uren per medewerker</li>
        </ul>
      </div>

      <div class="right">
        <div class="card">
          <div class="logo-row">
            <div class="logo-badge">${AppLogo(34)}</div>
            <div class="logo-text-wrap">
              <div class="logo-name">Rooster</div>
            </div>
          </div>

          <h2>Inloggen</h2>
          <p class="subtitle">Vul je inlogcode en wachtwoord in</p>

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
      </div>
    `;
  }
}

customElements.define('login-page', LoginPage);
