import { LitElement, html, css } from 'lit';
import { authStore } from '../store.js';
import { updateUser } from '../api.js';
import { employeeColor } from '../date-utils.js';
import { ShieldIcon, UserIcon, MapPinIcon, InfoIcon, LockIcon, EyeIcon, EyeOffIcon, CheckIcon, LogOutIcon } from '../icons.js';

class ProfilePage extends LitElement {
  static properties = {
    _saving: { state: true },
    _success: { state: true },
    _error: { state: true },
    _pwVisible: { state: true },
  };

  static styles = css`
    :host { display: block; background: var(--app-bg-light); min-height: calc(100vh - 60px); }

    .page { max-width: 640px; margin: 0 auto; padding: 1.25rem 1rem; }

    /* bovenkant */
    .profile-hero {
      background: var(--app-blue);
      border-radius: 16px;
      padding: 1.75rem 1.5rem;
      display: flex; align-items: center; gap: 1.25rem;
      margin-bottom: 1.25rem;
      color: #fff;
      box-shadow: 0 4px 16px rgba(15,37,55,0.15);
    }

    .avatar-big {
      width: 72px; height: 72px; border-radius: 50%;
      background: rgba(255,255,255,0.25);
      border: 3px solid rgba(255,255,255,0.5);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; font-weight: 900; color: #fff;
      flex-shrink: 0;
    }

    .profile-info { flex: 1; min-width: 0; }

    .profile-name {
      font-size: 1.3rem; font-weight: 800; line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .profile-tags { display: flex; gap: 0.4rem; margin-top: 0.6rem; flex-wrap: wrap; }

    .ptag {
      background: rgba(255,255,255,0.22);
      border-radius: 20px; padding: 0.2rem 0.65rem;
      font-size: 0.72rem; font-weight: 600; white-space: nowrap;
      display: inline-flex; align-items: center; gap: 0.3rem;
    }

    /* kaarten */
    .card {
      background: var(--app-bg-main);
      border: 1px solid var(--app-border);
      border-radius: 14px;
      margin-bottom: 1rem;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .card-header {
      padding: 0.9rem 1.25rem;
      border-bottom: 1px solid var(--app-border);
      background: var(--app-bg-light);
      display: flex; align-items: center; gap: 0.6rem;
    }

    .card-header h3 {
      font-size: 0.9rem; font-weight: 700;
      color: var(--app-text-dark);
    }

    .card-icon { display: flex; align-items: center; color: var(--app-text-muted); }

    .card-body { padding: 1.25rem; }

    /* info */
    .info-row {
      display: flex; align-items: center;
      padding: 0.6rem 0;
      border-bottom: 1px solid var(--app-bg-light);
      gap: 0.75rem;
    }

    .info-row:last-child { border-bottom: none; }

    .info-label {
      font-size: 0.78rem; color: var(--app-text-muted);
      font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px;
      min-width: 110px; flex-shrink: 0;
    }

    .info-value {
      font-size: 0.9rem; color: var(--app-text-dark);
      font-weight: 500; flex: 1;
    }

    .role-badge {
      display: inline-flex; align-items: center; gap: 0.3rem;
      padding: 0.2rem 0.65rem; border-radius: 20px;
      font-size: 0.75rem; font-weight: 700;
    }

    .role-employer { background: rgba(37,99,235,0.1); color: var(--app-accent); }
    .role-employee { background: rgba(46,125,50,0.1); color: var(--app-success); }

    /* formulier */
    .field { margin-bottom: 1rem; }

    label {
      display: block;
      font-size: 0.75rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.5px;
      color: var(--app-text-muted);
      margin-bottom: 0.4rem;
    }

    .pw-wrap { position: relative; }

    /* onder 16px zoomt iOS in */
    input {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1.5px solid var(--app-border);
      border-radius: 10px;
      font-size: 16px;
      outline: none;
      color: var(--app-text-dark);
      background: var(--app-bg-light);
      transition: border-color 0.18s, box-shadow 0.18s;
      -webkit-appearance: none;
      box-sizing: border-box;
    }

    input:focus {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
      background: var(--app-bg-main);
    }

    .pw-wrap input { padding-right: 3rem; }

    .pw-toggle {
      position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted); font-size: 1rem; padding: 0.25rem;
    }

    .hint-text {
      font-size: 0.75rem; color: var(--app-text-muted); margin-top: 0.3rem;
    }

    .btn-save {
      background: var(--app-accent);
      color: #fff; border: none;
      border-radius: 10px; padding: 0.85rem 1.5rem;
      font-size: 0.92rem; font-weight: 700;
      cursor: pointer; transition: background 0.15s;
      width: 100%; min-height: 48px;
      -webkit-appearance: none;
    }

    .btn-save:hover:not(:disabled) { background: var(--app-accent-hover); }
    .btn-save:disabled { opacity: 0.55; cursor: not-allowed; }

    .success-msg {
      display: flex; align-items: center; gap: 0.5rem;
      background: var(--app-success-light); border: 1px solid rgba(46,125,50,0.25);
      color: var(--app-success); border-radius: 8px;
      padding: 0.7rem 1rem; font-size: 0.84rem; margin-bottom: 1rem;
    }

    .error-msg {
      background: var(--app-discount-light); border: 1px solid rgba(211,47,47,0.25);
      color: var(--app-discount); border-radius: 8px;
      padding: 0.7rem 1rem; font-size: 0.84rem; margin-bottom: 1rem;
    }

    /* uitloggen */
    .btn-logout {
      width: 100%; padding: 0.85rem;
      background: none; border: 1.5px solid var(--app-border);
      border-radius: 10px; font-size: 0.9rem; font-weight: 600;
      color: var(--app-text-muted); cursor: pointer;
      transition: all 0.15s; min-height: 48px;
    }

    .btn-logout:hover {
      border-color: var(--app-discount); color: var(--app-discount);
      background: var(--app-discount-light);
    }

    @media (max-width: 480px) {
      .profile-hero { flex-direction: column; text-align: center; padding: 1.25rem 1rem; }
      .profile-tags { justify-content: center; }
      .info-label { min-width: 90px; }
    }
  `;

  constructor() {
    super();
    this._saving = false;
    this._success = '';
    this._error = '';
    this._pwVisible = false;
  }

  _initials() {
    return (authStore.user?.fullName || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  async _savePassword(e) {
    e.preventDefault();
    const f = e.target;
    const pw  = f.elements['password'].value;
    const pw2 = f.elements['password2'].value;

    if (pw !== pw2) { this._error = 'Wachtwoorden komen niet overeen.'; return; }
    if (pw.length < 6) { this._error = 'Wachtwoord moet minimaal 6 tekens zijn.'; return; }

    this._saving = true; this._error = ''; this._success = '';
    try {
      const u = authStore.user;
      await updateUser(u.id || u.userId, {
        fullName: u.fullName,
        role: u.role,
        password: pw,
      });
      this._success = 'Wachtwoord gewijzigd.';
      f.reset();
    } catch (err) {
      this._error = err.message || 'Opslaan mislukt.';
    } finally {
      this._saving = false;
    }
  }

  render() {
    const user = authStore.user;
    if (!user) return html``;
    const color = employeeColor(1);

    return html`
      <div class="page">
        <!-- Hero -->
        <div class="profile-hero">
          <div class="avatar-big">${this._initials()}</div>
          <div class="profile-info">
            <div class="profile-name">${user.fullName}</div>
            <div class="profile-tags">
              <span class="ptag">${user.role === 'EMPLOYER' ? html`${ShieldIcon(12)} Manager` : html`${UserIcon(12)} Medewerker`}</span>
            </div>
          </div>
        </div>

        <!-- Account info -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">${InfoIcon(16)}</span>
            <h3>Accountgegevens</h3>
          </div>
          <div class="card-body">
            <div class="info-row">
              <span class="info-label">Naam</span>
              <span class="info-value">${user.fullName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Rol</span>
              <span class="info-value">
                <span class="role-badge ${user.role === 'EMPLOYER' ? 'role-employer' : 'role-employee'}">
                  ${user.role === 'EMPLOYER' ? 'Manager' : 'Medewerker'}
                </span>
              </span>
            </div>
          </div>
        </div>

        <!-- Change password -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">${LockIcon(16)}</span>
            <h3>Wachtwoord wijzigen</h3>
          </div>
          <div class="card-body">
            ${this._success ? html`<div class="success-msg">${CheckIcon(15)} ${this._success}</div>` : ''}
            ${this._error   ? html`<div class="error-msg">${this._error}</div>` : ''}
            <form @submit=${this._savePassword}>
              <div class="field">
                <label>Nieuw wachtwoord</label>
                <div class="pw-wrap">
                  <input
                    name="password"
                    type=${this._pwVisible ? 'text' : 'password'}
                    placeholder="Minimaal 6 tekens"
                    minlength="6"
                    required
                    autocomplete="new-password"
                  >
                  <button type="button" class="pw-toggle"
                    @click=${() => this._pwVisible = !this._pwVisible}>
                    ${this._pwVisible ? EyeOffIcon(16) : EyeIcon(16)}
                  </button>
                </div>
              </div>
              <div class="field">
                <label>Herhaal wachtwoord</label>
                <input
                  name="password2"
                  type=${this._pwVisible ? 'text' : 'password'}
                  placeholder="Zelfde wachtwoord opnieuw"
                  minlength="6"
                  required
                  autocomplete="new-password"
                >
                <p class="hint-text">Wachtwoord moet minimaal 6 tekens bevatten.</p>
              </div>
              <button class="btn-save" type="submit" ?disabled=${this._saving}>
                ${this._saving ? 'Opslaan...' : 'Wachtwoord opslaan'}
              </button>
            </form>
          </div>
        </div>

        <!-- Logout -->
        <div class="card">
          <div class="card-body">
            <button class="btn-logout" @click=${() => authStore.logout()}
              style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
              ${LogOutIcon(16)} Uitloggen
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('profile-page', ProfilePage);
