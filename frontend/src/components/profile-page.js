import { LitElement, html, css } from 'lit';
import { authStore } from '../store.js';
import { updateUser } from '../api.js';
import { base } from '../ui.js';

class ProfilePage extends LitElement {
  static properties = {
    _saving: { state: true },
    _success: { state: true },
    _error: { state: true },
  };

  static styles = [base, css`
    dl { display: grid; grid-template-columns: 8rem 1fr; gap: 0.5rem 1rem; padding: 1rem 1.1rem; font-size: 0.92rem; }
    dt { color: var(--app-text-muted); }
    dd { font-weight: 600; }

    h2 { font-size: 1.1rem; margin: 2rem 0 0.6rem; }
    form.panel { padding: 1.1rem 1.1rem 0.2rem; }
    form .btn-primary { margin-bottom: 1rem; }

    .logout { margin-top: 2rem; }
  `];

  constructor() {
    super();
    this._saving = false;
    this._success = '';
    this._error = '';
  }

  async _savePassword(e) {
    e.preventDefault();
    const f = e.target;
    const pw = f.elements['password'].value;
    if (pw !== f.elements['password2'].value) { this._error = 'De twee wachtwoorden zijn niet hetzelfde.'; return; }

    this._saving = true; this._error = ''; this._success = '';
    try {
      const u = authStore.user;
      await updateUser(Number(u.loginCode), { fullName: u.fullName, role: u.role, password: pw });
      this._success = 'Je wachtwoord is aangepast.';
      f.reset();
    } catch (err) {
      this._error = err.message || 'Opslaan is niet gelukt.';
    } finally {
      this._saving = false;
    }
  }

  render() {
    const user = authStore.user;
    if (!user) return html``;

    return html`
      <div class="page page-narrow">
        <div class="page-head"><h1>${user.fullName}</h1></div>

        <dl class="panel">
          <dt>Inlogcode</dt><dd class="mono">${user.loginCode}</dd>
          <dt>Rol</dt><dd>${user.role === 'EMPLOYER' ? 'Manager' : 'Medewerker'}</dd>
        </dl>

        <h2>Wachtwoord veranderen</h2>
        ${this._success ? html`<div class="ok-bar">${this._success}</div>` : ''}
        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}
        <form class="panel" @submit=${this._savePassword}>
          <div class="field">
            <label for="pw">Nieuw wachtwoord</label>
            <input id="pw" name="password" type="password" minlength="6" required autocomplete="new-password">
            <span class="hint">Minstens 6 tekens.</span>
          </div>
          <div class="field">
            <label for="pw2">Nog een keer</label>
            <input id="pw2" name="password2" type="password" minlength="6" required autocomplete="new-password">
          </div>
          <button class="btn btn-primary" type="submit" ?disabled=${this._saving}>${this._saving ? 'Opslaan...' : 'Wachtwoord opslaan'}</button>
        </form>

        <button class="btn logout" @click=${() => authStore.logout()}>Uitloggen</button>
      </div>
    `;
  }
}

customElements.define('profile-page', ProfilePage);
