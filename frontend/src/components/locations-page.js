import { LitElement, html, css } from 'lit';
import { getLocations, createLocation, updateLocation, deleteLocation } from '../api.js';
import { EditIcon, TrashIcon } from '../icons.js';
import { base } from '../ui.js';
import './confirm-modal.js';

class LocationsPage extends LitElement {
  static properties = {
    _locations: { state: true },
    _loading: { state: true },
    _error: { state: true },
    _newName: { state: true },
    _editId: { state: true },
    _editName: { state: true },
    _confirmModal: { state: true },
  };

  static styles = [base, css`
    form.add { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    form.add input { max-width: 320px; }

    ul { list-style: none; }
    li { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.6rem 0.5rem 1rem; border-bottom: 1px solid var(--app-border); min-height: 50px; }
    li:last-child { border-bottom: none; }
    .name { flex: 1; font-weight: 600; }
    li input { flex: 1; padding: 0.35rem 0.55rem; }
  `];

  constructor() {
    super();
    this._locations = [];
    this._loading = true;
    this._error = '';
    this._newName = '';
    this._editId = null;
    this._editName = '';
    this._confirmModal = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    this._loading = true;
    try {
      this._locations = await getLocations();
    } catch (e) {
      this._error = e.message || 'De filialen konden niet geladen worden.';
    }
    this._loading = false;
  }

  async _add(e) {
    e.preventDefault();
    const name = this._newName.trim();
    if (!name) return;
    this._error = '';
    try {
      await createLocation(name);
      this._newName = '';
      await this._load();
    } catch (err) {
      this._error = err.message || 'Toevoegen is niet gelukt.';
    }
  }

  _startEdit(loc) {
    this._editId = loc.id;
    this._editName = loc.name;
  }

  async _saveEdit() {
    const name = this._editName.trim();
    if (!name) return;
    this._error = '';
    try {
      await updateLocation(this._editId, name);
      this._editId = null;
      await this._load();
    } catch (err) {
      this._error = err.message || 'Opslaan is niet gelukt.';
    }
  }

  _askDelete(loc) {
    this._confirmModal = {
      title: `${loc.name} verwijderen?`,
      message: 'Dit kan alleen als er geen diensten meer op dit filiaal staan.',
      onConfirm: async () => {
        this._confirmModal = null;
        this._error = '';
        try {
          await deleteLocation(loc.id);
          await this._load();
        } catch (err) {
          this._error = err.message || 'Verwijderen is niet gelukt.';
        }
      },
    };
  }

  _renderRow(loc) {
    if (this._editId === loc.id) {
      return html`
        <li>
          <input .value=${this._editName} aria-label="Naam"
            @input=${e => this._editName = e.target.value}
            @keydown=${e => { if (e.key === 'Enter') this._saveEdit(); if (e.key === 'Escape') this._editId = null; }}>
          <button class="btn btn-primary" @click=${this._saveEdit}>Opslaan</button>
          <button class="btn" @click=${() => this._editId = null}>Annuleren</button>
        </li>
      `;
    }
    return html`
      <li>
        <span class="name">${loc.name}</span>
        <button class="icon-btn" title="Naam aanpassen" @click=${() => this._startEdit(loc)}>${EditIcon(15)}</button>
        <button class="icon-btn del" title="Verwijderen" @click=${() => this._askDelete(loc)}>${TrashIcon(15)}</button>
      </li>
    `;
  }

  render() {
    return html`
      <div class="page page-narrow">
        <div class="page-head"><h1>Filialen</h1></div>

        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

        <form class="add" @submit=${this._add}>
          <input placeholder="Naam van een nieuw filiaal" aria-label="Naam van een nieuw filiaal" .value=${this._newName}
            @input=${e => this._newName = e.target.value}>
          <button class="btn" type="submit" ?disabled=${!this._newName.trim()}>Toevoegen</button>
        </form>

        ${this._loading ? html`<div class="loading">Laden...</div>`
          : this._locations.length === 0 ? html`<div class="empty panel">Nog geen filialen. Voeg er hierboven een toe.</div>`
          : html`<ul class="panel">${this._locations.map(loc => this._renderRow(loc))}</ul>`}
      </div>

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

customElements.define('locations-page', LocationsPage);
