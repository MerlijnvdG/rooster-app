import { LitElement, html, css } from 'lit';
import { loginWithCode } from '../api.js';
import { authStore } from '../store.js';
import { base } from '../ui.js';
import { EyeIcon, EyeOffIcon } from '../icons.js';

class LoginPage extends LitElement {
  static properties = {
    _loading: { state: true },
    _error: { state: true },
    _pwVisible: { state: true },
  };

  static styles = [base, css`
    :host {
      display: flex; min-height: 100vh; align-items: center; justify-content: center;
      padding: 1.5rem 1rem; background: var(--app-bg-light);
    }

    .wrap { width: 100%; max-width: 360px; }

    .brand { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 2rem; }
    .brand img { width: 36px; height: 36px; border-radius: 9px; }
    .brand span { font-family: var(--font-head); font-stretch: 85%; font-weight: 700; font-size: 1.4rem; }

    h1 { font-size: 1.6rem; margin-bottom: 0.3rem; }
    .intro { color: var(--app-text-muted); font-size: 0.92rem; margin-bottom: 1.5rem; }

    .code { font-family: var(--font-mono); letter-spacing: 0.2em; font-size: 1.1rem; }

    .pw { position: relative; }
    .pw input { padding-right: 2.6rem; }
    .pw .icon-btn { position: absolute; right: 3px; top: 50%; transform: translateY(-50%); }

    .btn-primary { width: 100%; padding: 0.65rem; margin-top: 0.4rem; font-size: 0.95rem; }

    .foot { margin-top: 1.5rem; font-size: 0.85rem; color: var(--app-text-muted); }
  `];

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
      this._error = 'Inlogcode of wachtwoord klopt niet.';
    } finally {
      this._loading = false;
    }
  }

  render() {
    return html`
      <div class="wrap">
        <div class="brand"><img src="/logo.png" alt=""><span>Rooster</span></div>

        <h1>Inloggen</h1>
        <p class="intro">Met de code van zes cijfers die je van je manager hebt gekregen.</p>

        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

        <form @submit=${this._submit}>
          <div class="field">
            <label for="code">Inlogcode</label>
            <input id="code" class="code" name="code" type="text" inputmode="numeric" maxlength="6"
              placeholder="000000" autocomplete="username" required ?disabled=${this._loading}>
          </div>
          <div class="field">
            <label for="password">Wachtwoord</label>
            <div class="pw">
              <input id="password" name="password" type=${this._pwVisible ? 'text' : 'password'}
                autocomplete="current-password" required ?disabled=${this._loading}>
              <button type="button" class="icon-btn" @click=${() => this._pwVisible = !this._pwVisible}
                title=${this._pwVisible ? 'Verberg wachtwoord' : 'Toon wachtwoord'}>
                ${this._pwVisible ? EyeOffIcon(16) : EyeIcon(16)}
              </button>
            </div>
          </div>
          <button class="btn btn-primary" type="submit" ?disabled=${this._loading}>
            ${this._loading ? 'Bezig met inloggen...' : 'Inloggen'}
          </button>
        </form>

        <p class="foot">Wachtwoord vergeten? Je manager kan een nieuw wachtwoord voor je instellen.</p>
      </div>
    `;
  }
}

customElements.define('login-page', LoginPage);
