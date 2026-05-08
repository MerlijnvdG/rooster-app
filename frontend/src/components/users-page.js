import { LitElement, html, css } from 'lit';
import { getAllUsers, createUser, updateUser, deleteUser } from '../api.js';
import { employeeColor } from '../date-utils.js';
import { SearchIcon, PlusIcon, UsersIcon, TagIcon, KeyIcon, EditIcon, TrashIcon, XIcon, EyeIcon } from '../icons.js';
import './searchable-select.js';
import './employee-detail-modal.js';
import './confirm-modal.js';

class UserModal extends LitElement {
  static properties = {
    open: { type: Boolean }, user: { type: Object },
    _saving: { state: true }, _error: { state: true },
    _role: { state: true },
  };

  static styles = css`
    .overlay {
      position: fixed; inset: 0; background: rgba(15,37,55,0.6);
      display: flex; align-items: center; justify-content: center;
      z-index: 200; padding: 1rem; backdrop-filter: blur(2px);
    }
    .modal { background: var(--app-bg-main); border-radius: 16px; width: 100%; max-width: 460px; overflow: hidden; box-shadow: var(--shadow-lg); }
    .modal-header { background: var(--app-blue); color: #fff; padding: 1.1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
    .modal-header h3 { font-size: 1rem; font-weight: 700; }
    .close-btn { background: rgba(255,255,255,0.1); border: none; color: #fff; width: 30px; height: 30px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .close-btn:hover { background: rgba(255,255,255,0.2); }
    .modal-body { padding: 1.5rem; }
    .field { margin-bottom: 1rem; }
    label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--app-text-muted); margin-bottom: 0.4rem; }
    input { box-sizing: border-box; width: 100%; padding: 0.75rem 0.9rem; border: 1.5px solid var(--app-border); border-radius: 8px; font-size: 0.92rem; outline: none; color: var(--app-text-dark); background: var(--app-bg-main); transition: border-color 0.18s, box-shadow 0.18s; }
    input:focus, select:focus { border-color: var(--app-accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); background: var(--app-bg-main); }
    .hint { font-size: 0.78rem; color: var(--app-text-muted); margin-top: 0.3rem; }
    .error { background: var(--app-discount-light); border: 1px solid rgba(211,47,47,0.3); color: var(--app-discount); border-radius: 8px; padding: 0.6rem 0.9rem; font-size: 0.84rem; margin-bottom: 1rem; }
    .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--app-border); display: flex; gap: 0.75rem; justify-content: flex-end; background: var(--app-bg-light); }
    .btn { padding: 0.65rem 1.4rem; border-radius: 8px; font-size: 0.88rem; font-weight: 600; cursor: pointer; border: none; transition: all 0.18s; }
    .btn-cancel { background: var(--app-bg-main); color: var(--app-text-dark); border: 1.5px solid var(--app-border); }
    .btn-cancel:hover { background: #f4f6f8; }
    .btn-save { background: var(--app-accent); color: #fff; }
    .btn-save:hover:not(:disabled) { background: var(--app-accent-hover); }
    .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
  `;

  constructor() { super(); this.open = false; this.user = null; this._saving = false; this._error = ''; this._role = 'EMPLOYEE'; }

  updated(changed) {
    if (changed.has('user') || changed.has('open')) {
      this._role = this.user?.role || 'EMPLOYEE';
    }
  }

  _close() { this.dispatchEvent(new CustomEvent('close')); }

  async _submit(e) {
    e.preventDefault();
    this._error = ''; this._saving = true;
    const f = e.target;
    const fullName = f.elements['fullName'].value.trim();
    const data = {
      fullName,
      role: this._role,
      password: f.elements['password'].value || undefined,
    };
    if (!this.user) data.username = fullName.toLowerCase().replace(/\s+/g, '.');
    this.dispatchEvent(new CustomEvent('save', { detail: { id: this.user?.id, data } }));
    this._saving = false;
  }

  render() {
    if (!this.open) return html``;
    const u = this.user;
    return html`
      <div class="overlay" @click=${e => e.target === e.currentTarget && this._close()}>
        <div class="modal">
          <div class="modal-header">
            <h3>${u ? 'Medewerker bewerken' : 'Nieuwe gebruiker aanmaken'}</h3>
            <button class="close-btn" @click=${this._close}>${XIcon(14)}</button>
          </div>
          <div class="modal-body">
            ${this._error ? html`<div class="error">${this._error}</div>` : ''}
            <form id="user-form" @submit=${this._submit}>
              <div class="field">
                <label>Volledige naam</label>
                <input name="fullName" type="text" required .value=${u?.fullName || ''} placeholder="bijv. Jan Pietersen">
              </div>
              <div class="field">
                <label>Rol</label>
                <searchable-select
                  .options=${[{value:'EMPLOYEE',label:'Medewerker'},{value:'EMPLOYER',label:'Manager'}]}
                  .value=${this._role}
                  @change=${e => this._role = e.detail.value}>
                </searchable-select>
              </div>
              <div class="field">
                <label>${u ? 'Nieuw wachtwoord (leeg = niet wijzigen)' : 'Wachtwoord'}</label>
                <input name="password" type="password" ?required=${!u} minlength="6" placeholder="${u ? 'Leeg laten om te behouden' : 'Minimaal 6 tekens'}">
                <div class="hint">Minimaal 6 tekens.</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-cancel" @click=${this._close}>Annuleren</button>
            <button class="btn btn-save" form="user-form" type="submit" ?disabled=${this._saving}>
              ${this._saving ? 'Opslaan...' : u ? 'Wijzigingen opslaan' : 'Gebruiker aanmaken'}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('user-modal', UserModal);

class UsersPage extends LitElement {
  static properties = {
    _users: { state: true }, _locations: { state: true },
    _loading: { state: true }, _error: { state: true },
    _modalOpen: { state: true }, _editUser: { state: true },
    _search: { state: true }, _roleFilter: { state: true },
    _profileUser: { state: true },
    _confirmModal: { state: true },
  };

  static styles = css`
    :host { display: block; overflow-x: hidden; }

    .toolbar {
      background: var(--app-bg-main);
      border-bottom: 1px solid var(--app-border);
      position: sticky; top: 0; z-index: 50;
    }

    .toolbar-row {
      display: flex; align-items: center; gap: 0.4rem;
      padding: 0.55rem 1.25rem 0;
    }
    .toolbar-row.filters { padding-top: 0.35rem; padding-bottom: 0.55rem; }

    .search-wrap { position: relative; flex: 1; min-width: 0; }
    .search-wrap input {
      box-sizing: border-box;
      width: 100%; padding: 0.48rem 0.85rem 0.48rem 2.1rem;
      border: 1.5px solid var(--app-border); border-radius: 8px;
      font-size: 0.85rem; outline: none; transition: border-color 0.18s;
      background: var(--app-bg-light);
    }
    .search-wrap input:focus { border-color: var(--app-accent); background: var(--app-bg-main); }
    .search-icon { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: var(--app-text-muted); display: flex; align-items: center; pointer-events: none; }

    searchable-select.filter { flex: 1; min-width: 0; }

    .add-btn {
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      background: var(--app-accent); color: #fff;
      border: none; border-radius: 8px;
      cursor: pointer; flex-shrink: 0;
      transition: background 0.18s;
    }
    .add-btn:hover { background: var(--app-accent-hover); }

    .content { padding: 1.5rem; }

    .stats-bar {
      display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;
    }

    .stat-card {
      background: var(--app-bg-main); border: 1px solid var(--app-border);
      border-radius: 10px; padding: 0.65rem 1rem;
      display: flex; align-items: center; gap: 0.65rem;
      box-shadow: var(--shadow-sm);
      flex: 1; min-width: 110px;
    }

    .stat-icon { display: flex; align-items: center; color: var(--app-text-muted); }
    .stat-val { font-size: 1.4rem; font-weight: 800; color: var(--app-blue); line-height: 1; }
    .stat-lbl { font-size: 0.75rem; color: var(--app-text-muted); }

    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 0.75rem;
    }

    .user-card {
      background: var(--app-bg-main);
      border: 1px solid var(--app-border);
      border-radius: 12px;
      padding: 1.1rem 1.25rem;
      display: flex; align-items: center; gap: 0.9rem;
      box-shadow: var(--shadow-sm);
      transition: box-shadow 0.18s, transform 0.1s;
    }

    .user-card:hover { box-shadow: var(--shadow-md); }

    .avatar {
      width: 44px; height: 44px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.9rem; font-weight: 700; color: #fff;
      flex-shrink: 0;
    }

    .user-info { flex: 1; min-width: 0; }

    .user-name {
      font-size: 0.95rem; font-weight: 700;
      color: var(--app-text-dark);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .user-username { font-size: 0.78rem; color: var(--app-text-muted); }

    .user-tags { display: flex; gap: 0.4rem; margin-top: 0.35rem; flex-wrap: wrap; }

    .tag {
      font-size: 0.7rem; font-weight: 600; padding: 0.15rem 0.5rem;
      border-radius: 20px; white-space: nowrap;
    }

    .tag-role-employer { background: var(--app-blue-faint); color: var(--app-blue); }
    .tag-role-employee { background: rgba(46,125,50,0.1); color: var(--app-success); }
    .tag-loc { background: var(--app-bg-light); color: var(--app-text-muted); }

    .user-actions { display: flex; gap: 0.3rem; }

    .icon-btn {
      width: 32px; height: 32px; border: none;
      background: var(--app-bg-light);
      border-radius: 7px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.9rem; transition: background 0.18s;
    }

    .icon-btn:hover { background: var(--app-border); }
    .icon-btn.del:hover { background: var(--app-discount-light); color: var(--app-discount); }

    .empty { text-align: center; padding: 3rem; color: var(--app-text-muted); }
    .error-bar { background: var(--app-discount-light); border: 1px solid rgba(211,47,47,0.3); color: var(--app-discount); border-radius: 8px; padding: 0.6rem 1rem; margin-bottom: 1rem; font-size: 0.85rem; }

    @media (max-width: 600px) {
      .toolbar-row { padding-left: 1rem; padding-right: 1rem; }
      .content { padding: 1rem; }
      .stat-card { padding: 0.5rem 0.75rem; }
      .stat-val { font-size: 1.2rem; }
    }
  `;

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
    } catch { this._error = 'Kon gebruikers niet laden.'; }
    finally { this._loading = false; }
  }

  _openAdd()       { this._editUser = null; this._modalOpen = true; }
  _openEdit(user)  { this._editUser = user; this._modalOpen = true; }
  _closeModal()    { this._modalOpen = false; this._editUser = null; }

  async _handleSave({ detail: { id, data } }) {
    try {
      if (id) await updateUser(id, data); else await createUser(data);
      this._closeModal();
      await this._load();
    } catch (e) { this._error = e.message || 'Opslaan mislukt.'; }
  }

  _handleDelete(id, name) {
    this._confirmModal = {
      title: `Gebruiker verwijderen?`,
      message: `"${name}" en alle bijbehorende diensten worden definitief verwijderd.`,
      confirmLabel: 'Verwijderen',
      onConfirm: async () => {
        this._confirmModal = null;
        try { await deleteUser(id); await this._load(); }
        catch (e) { this._error = e.message || 'Verwijderen mislukt.'; }
      },
    };
  }

  _filtered() {
    return this._users.filter(u => {
      const q = this._search.toLowerCase();
      if (q && !u.fullName.toLowerCase().includes(q)) return false;
      if (this._roleFilter && u.role !== this._roleFilter) return false;
      return true;
    });
  }

  _initials(name) { return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(); }

  render() {
    const filtered = this._filtered();
    const employees = this._users.filter(u => u.role === 'EMPLOYEE').length;
    const managers  = this._users.filter(u => u.role === 'EMPLOYER').length;

    return html`
      <div class="toolbar">
        <div class="toolbar-row">
          <div class="search-wrap">
            <span class="search-icon">${SearchIcon(14)}</span>
            <input placeholder="Zoek op naam of gebruikersnaam..."
              .value=${this._search}
              @input=${e => this._search = e.target.value}>
          </div>
          <button class="add-btn" @click=${this._openAdd} title="Toevoegen">${PlusIcon(18)}</button>
        </div>
        <div class="toolbar-row filters">
          <searchable-select class="filter"
            .options=${[{value:'',label:'Alle rollen'},{value:'EMPLOYEE',label:'Medewerkers'},{value:'EMPLOYER',label:'Managers'}]}
            .value=${this._roleFilter}
            @change=${e => this._roleFilter = e.detail.value}>
          </searchable-select>
        </div>
      </div>

      <div class="content">
        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

        <div class="stats-bar">
          <div class="stat-card"><span class="stat-icon">${UsersIcon(20)}</span><div><div class="stat-val">${this._users.length}</div><div class="stat-lbl">Totaal gebruikers</div></div></div>
          <div class="stat-card"><span class="stat-icon">${TagIcon(20)}</span><div><div class="stat-val">${employees}</div><div class="stat-lbl">Medewerkers</div></div></div>
          <div class="stat-card"><span class="stat-icon">${KeyIcon(20)}</span><div><div class="stat-val">${managers}</div><div class="stat-lbl">Managers</div></div></div>
        </div>

        ${this._loading ? html`<div class="empty">Laden...</div>` :
          filtered.length === 0 ? html`<div class="empty">Geen gebruikers gevonden.</div>` : html`
          <div class="user-grid">
            ${filtered.map(u => {
              const color = employeeColor(u.id);
              return html`
                <div class="user-card">
                  <div class="avatar" style="background:${color}">${this._initials(u.fullName)}</div>
                  <div class="user-info">
                    <div class="user-name">${u.fullName}</div>
                    <div class="user-username">${u.loginCode}</div>
                    <div class="user-tags">
                      <span class="tag ${u.role === 'EMPLOYER' ? 'tag-role-employer' : 'tag-role-employee'}">
                        ${u.role === 'EMPLOYER' ? 'Manager' : 'Medewerker'}
                      </span>
                    </div>
                  </div>
                  <div class="user-actions">
                    <button class="icon-btn" title="Profiel bekijken"
                      @click=${() => this._profileUser = { id: u.id, name: u.fullName, role: u.role }}>
                      ${EyeIcon(14)}
                    </button>
                    <button class="icon-btn" title="Bewerken" @click=${() => this._openEdit(u)}>${EditIcon(14)}</button>
                    <button class="icon-btn del" title="Verwijderen" @click=${() => this._handleDelete(u.id, u.fullName)}>${TrashIcon(14)}</button>
                  </div>
                </div>
              `;
            })}
          </div>
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
        .confirmLabel=${this._confirmModal?.confirmLabel || 'Verwijderen'}
        danger
        @confirm=${() => this._confirmModal?.onConfirm?.()}
        @cancel=${() => this._confirmModal = null}
      ></confirm-modal>
    `;
  }
}

customElements.define('users-page', UsersPage);
