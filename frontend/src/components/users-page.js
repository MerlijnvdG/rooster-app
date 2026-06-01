import { LitElement, html, css } from 'lit';
import { PlusIcon, EditIcon, TrashIcon, XIcon } from '../icons.js';
import { getAllUsers, createUser, updateUser, deleteUser } from '../api.js';
import { base } from '../ui.js';
import './employee-detail-modal.js';
import './confirm-modal.js';

class UserModal extends LitElement {
  static properties = {
    open: { type: Boolean }, user: { type: Object },
    _role: { state: true },
  };

  static styles = base;

  constructor() { super(); this.open = false; this.user = null; this._role = 'EMPLOYEE'; }

  willUpdate(changed) {
    if (changed.has('user') || changed.has('open')) {
      this._role = this.user?.role || 'EMPLOYEE';
    }
  }

  _close() { this.dispatchEvent(new CustomEvent('close')); }

  _submit(e) {
    e.preventDefault();
    const f = e.target;
    const fullName = f.elements['fullName'].value.trim();
    const data = {
      fullName,
      role: this._role,
      password: f.elements['password'].value || undefined,
    };
    if (!this.user) data.username = fullName.toLowerCase().replace(/\s+/g, '.');
    this.dispatchEvent(new CustomEvent('save', { detail: { id: this.user?.id, data } }));
  }

  render() {
    if (!this.open) return html``;
    const u = this.user;
    return html`
      <div class="overlay" @click=${e => e.target === e.currentTarget && this._close()}>
        <div class="sheet">
          <div class="sheet-head">
            <h2>${u ? u.fullName : 'Medewerker toevoegen'}</h2>
            <button class="icon-btn" @click=${this._close} title="Sluiten">${XIcon(16)}</button>
          </div>
          <form class="sheet-body" id="user-form" @submit=${this._submit}>
            <div class="field">
              <label for="fullName">Naam</label>
              <input id="fullName" name="fullName" type="text" required .value=${u?.fullName || ''}>
            </div>
            <div class="field">
              <label for="role">Rol</label>
              <select id="role" .value=${this._role} @change=${e => this._role = e.target.value}>
                <option value="EMPLOYEE" ?selected=${this._role === 'EMPLOYEE'}>Medewerker</option>
                <option value="EMPLOYER" ?selected=${this._role === 'EMPLOYER'}>Manager</option>
              </select>
            </div>
            <div class="field">
              <label for="password">${u ? 'Nieuw wachtwoord' : 'Wachtwoord'}</label>
              <input id="password" name="password" type="password" ?required=${!u} minlength="6" autocomplete="new-password">
              <span class="hint">${u ? 'Laat leeg om het huidige wachtwoord te houden.' : 'Minstens 6 tekens.'}</span>
            </div>
          </form>
          <div class="sheet-foot">
            <button class="btn" @click=${this._close}>Annuleren</button>
            <button class="btn btn-primary" form="user-form" type="submit">${u ? 'Opslaan' : 'Toevoegen'}</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('user-modal', UserModal);

class UsersPage extends LitElement {
  static properties = {
    _users: { state: true },
    _loading: { state: true }, _error: { state: true },
    _modalOpen: { state: true }, _editUser: { state: true },
    _search: { state: true }, _roleFilter: { state: true },
    _profileUser: { state: true },
    _confirmModal: { state: true },
  };

  static styles = [base, css`
    .filters { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    .filters input { max-width: 280px; }
    .filters select { width: auto; }

    table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
    th {
      text-align: left; font-weight: 600; font-size: 0.8rem; color: var(--app-text-muted);
      padding: 0.6rem 0.85rem; border-bottom: 1px solid var(--app-border); background: var(--app-card-header);
    }
    td { padding: 0.55rem 0.85rem; border-bottom: 1px solid var(--app-border); }
    tr:last-child td { border-bottom: none; }
    tbody tr:hover { background: var(--app-card-header); }
    .panel { overflow: hidden; }

    .name { font: inherit; font-weight: 700; background: none; border: none; padding: 0; color: inherit; cursor: pointer; text-align: left; }
    .name:hover { color: var(--app-accent); text-decoration: underline; }
    .role-manager { font-weight: 600; }
    td.right { text-align: right; white-space: nowrap; }

    .count { font-size: 0.85rem; color: var(--app-text-muted); margin-top: 0.6rem; }

    @media (max-width: 600px) {
      .filters input { max-width: none; }
      .hide-sm { display: none; }
      td, th { padding-left: 0.6rem; padding-right: 0.6rem; }
    }
  `];

  constructor() {
    super();
    this._users = [];
    this._loading = true; this._error = '';
    this._modalOpen = false; this._editUser = null;
    this._search = ''; this._roleFilter = '';
    this._profileUser = null;
    this._confirmModal = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._load();
  }

  async _load() {
    this._loading = true;
    try {
      this._users = await getAllUsers();
    } catch { this._error = 'De medewerkers konden niet geladen worden.'; }
    finally { this._loading = false; }
  }

  _openAdd()      { this._editUser = null; this._modalOpen = true; }
  _openEdit(user) { this._editUser = user; this._modalOpen = true; }
  _closeModal()   { this._modalOpen = false; this._editUser = null; }

  async _handleSave({ detail: { id, data } }) {
    try {
      if (id) await updateUser(id, data); else await createUser(data);
      this._closeModal();
      await this._load();
    } catch (e) { this._error = e.message || 'Opslaan is niet gelukt.'; }
  }

  _handleDelete(id, name) {
    this._confirmModal = {
      title: `${name} verwijderen?`,
      message: 'Alle diensten van deze persoon worden ook verwijderd.',
      onConfirm: async () => {
        this._confirmModal = null;
        try { await deleteUser(id); await this._load(); }
        catch (e) { this._error = e.message || 'Verwijderen is niet gelukt.'; }
      },
    };
  }

  _filtered() {
    const q = this._search.trim().toLowerCase();
    return this._users
      .filter(u => (!q || u.fullName.toLowerCase().includes(q) || u.loginCode.includes(q))
        && (!this._roleFilter || u.role === this._roleFilter))
      .sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  render() {
    const list = this._filtered();

    return html`
      <div class="page">
        <div class="page-head">
          <h1>Medewerkers</h1>
          <button class="btn btn-primary" @click=${this._openAdd}>${PlusIcon(16)} Medewerker toevoegen</button>
        </div>

        <div class="filters">
          <input type="search" placeholder="Zoek op naam of code" .value=${this._search} @input=${e => this._search = e.target.value}>
          <select .value=${this._roleFilter} @change=${e => this._roleFilter = e.target.value}>
            <option value="">Iedereen</option>
            <option value="EMPLOYEE">Medewerkers</option>
            <option value="EMPLOYER">Managers</option>
          </select>
        </div>

        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

        ${this._loading ? html`<div class="loading">Laden...</div>`
          : list.length === 0 ? html`<div class="empty">${this._search || this._roleFilter ? 'Niemand gevonden met deze zoekopdracht.' : 'Er zijn nog geen medewerkers.'}</div>`
          : html`
            <div class="panel">
              <table>
                <thead><tr><th>Naam</th><th>Inlogcode</th><th class="hide-sm">Rol</th><th></th></tr></thead>
                <tbody>
                  ${list.map(u => html`
                    <tr>
                      <td>
                        <button class="name" @click=${() => this._profileUser = { id: u.id, name: u.fullName, role: u.role }}>${u.fullName}</button>
                      </td>
                      <td class="mono">${u.loginCode}</td>
                      <td class="hide-sm ${u.role === 'EMPLOYER' ? 'role-manager' : ''}">${u.role === 'EMPLOYER' ? 'Manager' : 'Medewerker'}</td>
                      <td class="right">
                        <button class="icon-btn" title="Aanpassen" @click=${() => this._openEdit(u)}>${EditIcon(15)}</button>
                        <button class="icon-btn del" title="Verwijderen" @click=${() => this._handleDelete(u.id, u.fullName)}>${TrashIcon(15)}</button>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
            <div class="count">${list.length} van ${this._users.length}</div>
          `}
      </div>

      <user-modal
        .open=${this._modalOpen}
        .user=${this._editUser}
        @close=${this._closeModal}
        @save=${this._handleSave}
      ></user-modal>

      <employee-detail-modal
        .open=${!!this._profileUser}
        .employee=${this._profileUser}
        @close=${() => this._profileUser = null}
      ></employee-detail-modal>

      <confirm-modal
        .open=${!!this._confirmModal}
        .title=${this._confirmModal?.title || ''}
        .message=${this._confirmModal?.message || ''}
        confirmLabel="Verwijderen"
        danger
        @confirm=${() => this._confirmModal?.onConfirm?.()}
        @cancel=${() => this._confirmModal = null}
      ></confirm-modal>
    `;
  }
}

customElements.define('users-page', UsersPage);
