import { LitElement, html } from 'lit';
import { XIcon } from '../icons.js';
import { base } from '../ui.js';

class ShiftModal extends LitElement {
  static properties = {
    open: { type: Boolean },
    shift: { type: Object },
    employees: { type: Array },
    locationId: { type: Number },
    _error: { state: true },
    _employeeId: { state: true },
    _date: { state: true },
    _startTime: { state: true },
    _endTime: { state: true },
  };

  static styles = base;

  constructor() {
    super();
    this.open = false;
    this.shift = null;
    this.employees = [];
    this._error = '';
    this._employeeId = '';
    this._date = '';
    this._startTime = '09:00';
    this._endTime = '18:00';
  }

  // zaterdag is de winkel om 17:00 dicht
  _defaultTimes(dateStr) {
    if (dateStr && new Date(dateStr).getDay() === 6) return { start: '09:00', end: '17:00' };
    return { start: '09:00', end: '18:00' };
  }

  willUpdate(changed) {
    if (changed.has('shift') || changed.has('open')) {
      this._error = '';
      this._employeeId = this.shift?.employeeId ? String(this.shift.employeeId) : '';
      this._date = this.shift?.date || '';
      const times = this._defaultTimes(this._date);
      this._startTime = this.shift?.startTime?.slice(0, 5) || times.start;
      this._endTime = this.shift?.endTime?.slice(0, 5) || times.end;
    }
  }

  _onDateChange(e) {
    this._date = e.target.value;
    if (!this.shift?.startTime) {
      const times = this._defaultTimes(this._date);
      this._startTime = times.start;
      this._endTime = times.end;
    }
  }

  _close() { this.dispatchEvent(new CustomEvent('close')); }

  _submit(e) {
    e.preventDefault();
    this._error = '';
    if (this._endTime <= this._startTime) { this._error = 'De eindtijd moet na de begintijd liggen.'; return; }
    const f = e.target;
    const data = {
      employeeId: Number(this._employeeId),
      locationId: this.locationId,
      date: this._date,
      startTime: this._startTime + ':00',
      endTime: this._endTime + ':00',
      note: f.elements['note'].value.trim() || null,
    };
    this.dispatchEvent(new CustomEvent('save', { detail: { id: this.shift?.id, data } }));
  }

  render() {
    if (!this.open) return html``;
    const s = this.shift;
    const sunday = this._date && new Date(this._date).getDay() === 0;
    const employees = [...this.employees].sort((a, b) => a.fullName.localeCompare(b.fullName));

    return html`
      <div class="overlay" @click=${e => e.target === e.currentTarget && this._close()}>
        <div class="sheet">
          <div class="sheet-head">
            <h2>${s?.id ? 'Dienst aanpassen' : 'Dienst toevoegen'}</h2>
            <button class="icon-btn" @click=${this._close} title="Sluiten">${XIcon(16)}</button>
          </div>
          <form class="sheet-body" id="shift-form" @submit=${this._submit}>
            ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}
            ${sunday ? html`<div class="error-bar">Op zondag is het filiaal dicht.</div>` : ''}
            <div class="field">
              <label for="emp">Medewerker</label>
              <select id="emp" required .value=${this._employeeId} @change=${e => this._employeeId = e.target.value}>
                <option value="">Kies een medewerker</option>
                ${employees.map(e => html`<option value=${String(e.id)} ?selected=${String(e.id) === this._employeeId}>${e.fullName}</option>`)}
              </select>
            </div>
            <div class="field">
              <label for="date">Datum</label>
              <input id="date" type="date" required .value=${this._date} @change=${this._onDateChange}>
            </div>
            <div class="row">
              <div class="field">
                <label for="start">Van</label>
                <input id="start" type="time" step="900" required .value=${this._startTime} @change=${e => this._startTime = e.target.value}>
              </div>
              <div class="field">
                <label for="end">Tot</label>
                <input id="end" type="time" step="900" required .value=${this._endTime} @change=${e => this._endTime = e.target.value}>
              </div>
            </div>
            <div class="field">
              <label for="note">Notitie</label>
              <input id="note" name="note" type="text" .value=${s?.note || ''} placeholder="Bijvoorbeeld kassa of magazijn">
            </div>
          </form>
          <div class="sheet-foot">
            ${s?.id ? html`
              <button class="btn btn-danger" style="margin-right:auto"
                @click=${() => this.dispatchEvent(new CustomEvent('delete', { detail: { id: s.id } }))}>Verwijderen</button>
            ` : ''}
            <button class="btn" @click=${this._close}>Annuleren</button>
            <button class="btn btn-primary" form="shift-form" type="submit" ?disabled=${sunday}>Opslaan</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('shift-modal', ShiftModal);
