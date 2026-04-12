import { LitElement, html, css } from 'lit';
import { XIcon } from '../icons.js';
import './searchable-select.js';

class ShiftModal extends LitElement {
  static properties = {
    open: { type: Boolean },
    shift: { type: Object },
    employees: { type: Array },
    locationId: { type: Number },
    _saving: { state: true },
    _error: { state: true },
    _employeeId: { state: true },
    _startTime: { state: true },
    _endTime: { state: true },
  };

  static styles = css`
    :host { -webkit-tap-highlight-color: transparent; }

    .overlay {
      position: fixed; inset: 0;
      background: rgba(15,37,55,0.6);
      display: flex; align-items: center; justify-content: center;
      z-index: 200; padding: 1rem;
      backdrop-filter: blur(2px);
    }

    .modal {
      background: #fff;
      border-radius: 16px;
      padding: 0;
      width: 100%;
      max-width: 480px;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
    }

    .modal-header {
      background: var(--app-blue);
      color: #fff;
      padding: 1.1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h3 { font-size: 1rem; font-weight: 700; }

    .close-btn {
      background: rgba(255,255,255,0.1);
      border: none; color: #fff;
      width: 30px; height: 30px;
      border-radius: 6px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      -webkit-tap-highlight-color: transparent;
    }

    .close-btn:hover { background: rgba(255,255,255,0.2); }

    .modal-body { padding: 1.25rem 1.25rem 0.5rem; }

    .field { margin-bottom: 0.9rem; }

    label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--app-text-muted);
      margin-bottom: 0.35rem;
    }

    input {
      box-sizing: border-box;
      width: 100%;
      padding: 0.7rem 0.85rem;
      border: 1.5px solid var(--app-border);
      border-radius: 8px;
      font-size: 0.92rem;
      outline: none;
      color: var(--app-text-dark);
      background: #fafbfc;
      transition: border-color 0.18s, box-shadow 0.18s;
      -webkit-tap-highlight-color: transparent;
    }

    input:focus {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
      background: #fff;
    }

    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; }
    .row .field { margin-bottom: 0; }

    .error {
      background: #ffebee;
      border: 1px solid rgba(211,47,47,0.3);
      color: #D32F2F;
      border-radius: 8px;
      padding: 0.6rem 0.9rem;
      font-size: 0.84rem;
      margin-bottom: 1rem;
    }

    .modal-footer {
      padding: 1rem 1.25rem;
      border-top: 1px solid var(--app-border);
      display: flex;
      gap: 0.65rem;
      justify-content: flex-end;
      background: var(--app-bg-light);
    }

    .btn {
      padding: 0.65rem 1.4rem;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.18s;
      -webkit-tap-highlight-color: transparent;
    }

    .btn-cancel {
      background: #fff;
      color: var(--app-text-dark);
      border: 1.5px solid var(--app-border);
    }

    .btn-cancel:hover { background: var(--app-bg-light); }

    .btn-save {
      background: var(--app-accent);
      color: #fff;
    }

    .btn-save:hover:not(:disabled) { background: var(--app-accent-hover); }
    .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
  `;

  constructor() {
    super();
    this.open = false;
    this.shift = null;
    this.employees = [];
    this._saving = false;
    this._error = '';
    this._employeeId = '';
    this._date = '';
    this._startTime = '09:00';
    this._endTime   = '18:00';
  }

  _defaultTimes(dateStr) {
    if (!dateStr) return { start: '09:00', end: '18:00' };
    const day = new Date(dateStr).getDay();
    return day === 6
      ? { start: '09:00', end: '17:00' }
      : { start: '09:00', end: '18:00' };
  }

  willUpdate(changed) {
    if (changed.has('shift') || changed.has('open')) {
      this._employeeId = this.shift?.employeeId ? String(this.shift.employeeId) : '';
      this._date = this.shift?.date || '';
      const times = this._defaultTimes(this._date);
      this._startTime = this.shift?.startTime?.slice(0, 5) || times.start;
      this._endTime   = this.shift?.endTime?.slice(0, 5)   || times.end;
    }
  }

  _onDateChange(e) {
    this._date = e.target.value;
    if (!this.shift?.startTime) {
      const times = this._defaultTimes(this._date);
      this._startTime = times.start;
      this._endTime   = times.end;
    }
  }

  _close() { this.dispatchEvent(new CustomEvent('close')); }

  async _submit(e) {
    e.preventDefault();
    this._error = '';
    if (!this._employeeId) { this._error = 'Selecteer een medewerker.'; return; }
    if (this._date && new Date(this._date).getDay() === 0) { this._error = 'Zondag is het filiaal gesloten.'; return; }
    this._saving = true;
    const f = e.target;
    const data = {
      employeeId: Number(this._employeeId),
      locationId: this.locationId,
      date: f.elements['date'].value,
      startTime: f.elements['startTime'].value + ':00',
      endTime: f.elements['endTime'].value + ':00',
      note: f.elements['note'].value || null,
    };
    this.dispatchEvent(new CustomEvent('save', { detail: { id: this.shift?.id, data } }));
    this._saving = false;
  }

  render() {
    if (!this.open) return html``;
    const s = this.shift;
    const empOptions = this.employees.map(e => ({ value: String(e.id), label: e.fullName }));

    const isSunday = this._date ? new Date(this._date).getDay() === 0 : false;

    return html`
      <div class="overlay" @click=${e => e.target === e.currentTarget && this._close()}>
        <div class="modal">
          <div class="modal-header">
            <h3>${s?.id ? 'Dienst bewerken' : 'Nieuwe dienst toevoegen'}</h3>
            <button class="close-btn" @click=${this._close}>${XIcon(14)}</button>
          </div>
          <div class="modal-body">
            ${this._error ? html`<div class="error">${this._error}</div>` : ''}
            ${isSunday ? html`<div class="error">Zondag is het filiaal gesloten.</div>` : ''}
            <form id="shift-form" @submit=${this._submit}>
              <div class="field">
                <label>Medewerker</label>
                <searchable-select
                  .options=${empOptions}
                  .value=${this._employeeId}
                  placeholder="Kies een medewerker..."
                  searchable
                  @change=${e => this._employeeId = e.detail.value}>
                </searchable-select>
              </div>
              <div class="field">
                <label>Datum</label>
                <input type="date" name="date" required .value=${this._date}
                  @change=${this._onDateChange}>
              </div>
              <div class="row">
                <div class="field">
                  <label>Begintijd</label>
                  <input type="time" name="startTime" required
                    .value=${this._startTime}
                    @change=${e => this._startTime = e.target.value}>
                </div>
                <div class="field">
                  <label>Eindtijd</label>
                  <input type="time" name="endTime" required
                    .value=${this._endTime}
                    @change=${e => this._endTime = e.target.value}>
                </div>
              </div>
              <div class="field">
                <label>Notitie (optioneel)</label>
                <input type="text" name="note" .value=${s?.note || ''} placeholder="bijv. kassa, magazijn, klantservice...">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-cancel" @click=${this._close}>Annuleren</button>
            <button class="btn btn-save" form="shift-form" type="submit" ?disabled=${this._saving || isSunday}>
              ${this._saving ? 'Opslaan...' : 'Dienst opslaan'}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('shift-modal', ShiftModal);
