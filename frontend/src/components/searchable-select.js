import { LitElement, html, css } from 'lit';
import { ChevronDown, SearchIcon } from '../icons.js';

class SearchableSelect extends LitElement {
  static properties = {
    options:     { type: Array },   // [{value, label}]
    value:       { type: String },
    placeholder: { type: String },
    name:        { type: String },
    required:    { type: Boolean },
    searchable:  { type: Boolean },
    _open:       { state: true },
    _query:      { state: true },
  };

  static styles = css`
    :host { display: block; position: relative; -webkit-tap-highlight-color: transparent; }

    .trigger {
      box-sizing: border-box;
      width: 100%;
      padding: 0.7rem 2.2rem 0.7rem 0.85rem;
      border: 1.5px solid var(--app-border);
      border-radius: 8px;
      font-size: 0.92rem;
      outline: none;
      color: var(--app-text-dark);
      background: #fafbfc;
      cursor: pointer;
      text-align: left;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      transition: border-color 0.18s, box-shadow 0.18s;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    .trigger:focus, .trigger.open {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
      background: #fff;
    }

    .trigger-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .trigger-label.placeholder { color: var(--app-text-muted); }

    .chevron { flex-shrink: 0; color: var(--app-text-muted); transition: transform 0.18s; }
    .chevron.open { transform: rotate(180deg); }

    .dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0; right: 0;
      background: #fff;
      border: 1.5px solid var(--app-border);
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      z-index: 1000;
      overflow: hidden;
    }

    .search-wrap {
      padding: 0.55rem 0.6rem;
      border-bottom: 1px solid var(--app-border);
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .search-wrap input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 0.88rem;
      color: var(--app-text-dark);
      background: transparent;
      -webkit-tap-highlight-color: transparent;
    }

    .search-icon { color: var(--app-text-muted); display: flex; align-items: center; flex-shrink: 0; }

    .options-list {
      max-height: 220px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .option {
      padding: 0.65rem 0.9rem;
      font-size: 0.91rem;
      cursor: pointer;
      color: var(--app-text-dark);
      transition: background 0.12s;
      -webkit-tap-highlight-color: transparent;
    }

    .option:hover, .option.focused { background: var(--app-bg-light); }
    .option.selected { color: var(--app-accent); font-weight: 600; }

    .no-results {
      padding: 0.85rem;
      font-size: 0.88rem;
      color: var(--app-text-muted);
      text-align: center;
    }
  `;

  constructor() {
    super();
    this.options = [];
    this.value = '';
    this.placeholder = 'Selecteer...';
    this.name = '';
    this.required = false;
    this.searchable = false;
    this._open = false;
    this._query = '';
  }

  get _selected() { return this.options.find(o => String(o.value) === String(this.value)); }

  get _filtered() {
    if (!this._query) return this.options;
    const q = this._query.toLowerCase();
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  _toggle() { this._open ? this._close() : this._openDropdown(); }

  _openDropdown() {
    this._open = true;
    this._query = '';
    this.updateComplete.then(() => {
      this.shadowRoot.querySelector('.search-wrap input')?.focus();
    });
  }

  _close() { this._open = false; this._query = ''; }

  _select(opt) {
    this.value = String(opt.value);
    this._close();
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  _handleOutside(e) {
    if (!this.shadowRoot.contains(e.composedPath()[0])) this._close();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('pointerdown', this._handleOutside.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('pointerdown', this._handleOutside.bind(this));
  }

  render() {
    const sel = this._selected;
    const filtered = this._filtered;

    return html`
      <button type="button" class="trigger ${this._open ? 'open' : ''}"
        @click=${this._toggle}>
        <span class="trigger-label ${!sel ? 'placeholder' : ''}">
          ${sel ? sel.label : this.placeholder}
        </span>
        <span class="chevron ${this._open ? 'open' : ''}">${ChevronDown(14)}</span>
      </button>

      ${this._open ? html`
        <div class="dropdown">
          ${this.searchable ? html`
            <div class="search-wrap">
              <span class="search-icon">${SearchIcon(14)}</span>
              <input
                type="text"
                placeholder="Zoeken..."
                .value=${this._query}
                @input=${e => this._query = e.target.value}
                @keydown=${e => e.key === 'Escape' && this._close()}>
            </div>
          ` : ''}
          <div class="options-list">
            ${filtered.length === 0
              ? html`<div class="no-results">Geen resultaten</div>`
              : filtered.map(opt => html`
                <div class="option ${String(opt.value) === String(this.value) ? 'selected' : ''}"
                  @pointerdown=${() => this._select(opt)}>
                  ${opt.label}
                </div>
              `)
            }
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('searchable-select', SearchableSelect);
