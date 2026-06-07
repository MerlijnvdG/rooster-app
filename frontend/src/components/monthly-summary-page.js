import { LitElement, html, css } from 'lit';
import { getMonthlySummary } from '../api.js';
import { ChevronLeft, ChevronRight } from '../icons.js';
import { base } from '../ui.js';

const MONTHS = ['Januari','Februari','Maart','April','Mei','Juni',
                 'Juli','Augustus','September','Oktober','November','December'];

class MonthlySummaryPage extends LitElement {
  static properties = {
    _year:    { state: true },
    _month:   { state: true },
    _data:    { state: true },
    _loading: { state: true },
    _error:   { state: true },
  };

  static styles = [base, css`
    .monthnav { display: flex; gap: 0.25rem; }
    .monthnav .btn { padding: 0.45rem 0.6rem; }

    .panel { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
    th { text-align: left; font-size: 0.8rem; font-weight: 600; color: var(--app-text-muted); padding: 0.6rem 0.85rem; border-bottom: 1px solid var(--app-border); background: var(--app-card-header); }
    td { padding: 0.55rem 0.85rem; border-bottom: 1px solid var(--app-border); }
    .r { text-align: right; font-family: var(--font-mono); font-variant-numeric: tabular-nums; white-space: nowrap; }
    th.r { font-family: var(--font-body); }
    .loc { font-size: 0.8rem; color: var(--app-text-muted); }
    .net { font-weight: 600; }
    tfoot td { font-weight: 700; border-bottom: none; border-top: 2px solid var(--app-border); }
    .note { font-size: 0.82rem; color: var(--app-text-muted); margin-top: 0.6rem; }

    @media (max-width: 600px) {
      .hide-sm { display: none; }
      td, th { padding-left: 0.6rem; padding-right: 0.6rem; }
    }
  `];

  constructor() {
    super();
    const now = new Date();
    this._year    = now.getFullYear();
    this._month   = now.getMonth() + 1;
    this._data    = [];
    this._loading = true;
    this._error   = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    this._loading = true;
    this._error   = '';
    try {
      const raw = await getMonthlySummary(this._year, this._month);
      this._data = [...raw].sort((a, b) => a.employeeName.localeCompare(b.employeeName, 'nl'));
    } catch (e) {
      this._error = e.message || 'Het overzicht kon niet geladen worden.';
    } finally {
      this._loading = false;
    }
  }

  _prevMonth() {
    if (this._month === 1) { this._year--; this._month = 12; }
    else this._month--;
    this._load();
  }

  _nextMonth() {
    if (this._isCurrentMonth()) return;
    if (this._month === 12) { this._year++; this._month = 1; }
    else this._month++;
    this._load();
  }

  _isCurrentMonth() {
    const now = new Date();
    return this._year === now.getFullYear() && this._month === now.getMonth() + 1;
  }

  _hhmm(decimalHours) {
    const totalMin = Math.round(decimalHours * 60);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${h}:${String(m).padStart(2, '0')}`;
  }

  _exportCSV() {
    const monthName = `${MONTHS[this._month - 1]} ${this._year}`;
    const header = ['Naam','Filiaal','Diensten','Bruto (u:m)','Pauze (u:m)','Netto (u:m)'];
    const rows = this._data.map(e => [
      e.employeeName,
      e.locationName || '',
      e.shiftCount,
      this._hhmm(e.grossHours),
      this._hhmm(e.breakHours),
      this._hhmm(e.netHours),
    ]);

    const totalGross = this._data.reduce((s, e) => s + e.grossHours, 0);
    const totalBreak = this._data.reduce((s, e) => s + e.breakHours, 0);
    const totalNet   = this._data.reduce((s, e) => s + e.netHours,   0);
    const totalShifts = this._data.reduce((s, e) => s + e.shiftCount, 0);
    rows.push(['Totaal', '', totalShifts, this._hhmm(totalGross), this._hhmm(totalBreak), this._hhmm(totalNet)]);

    const csv = [header, ...rows].map(r => r.map(v => `"${v}"`).join(';')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `uren-${this._year}-${String(this._month).padStart(2,'0')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  render() {
    const sum = (k) => this._data.reduce((t, e) => t + e[k], 0);

    return html`
      <div class="page">
        <div class="page-head">
          <div>
            <h1>${MONTHS[this._month - 1]} ${this._year}</h1>
            <div class="sub">Gewerkte uren per medewerker</div>
          </div>
          <div class="actions">
            <div class="monthnav">
              <button class="btn" @click=${this._prevMonth} title="Vorige maand">${ChevronLeft(16)}</button>
              <button class="btn" @click=${this._nextMonth} ?disabled=${this._isCurrentMonth()} title="Volgende maand">${ChevronRight(16)}</button>
            </div>
            <button class="btn" @click=${this._exportCSV} ?disabled=${this._loading || this._data.length === 0}>Download als CSV</button>
          </div>
        </div>

        ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

        ${this._loading ? html`<div class="loading">Laden...</div>`
          : this._data.length === 0 ? html`<div class="empty panel">Geen diensten in ${MONTHS[this._month - 1].toLowerCase()}.</div>`
          : html`
            <div class="panel">
              <table>
                <thead>
                  <tr>
                    <th>Medewerker</th>
                    <th class="r">Diensten</th>
                    <th class="r hide-sm">Gepland</th>
                    <th class="r hide-sm">Pauze</th>
                    <th class="r">Gewerkt</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._data.map(e => html`
                    <tr>
                      <td>${e.employeeName}${e.locationName ? html`<div class="loc">${e.locationName}</div>` : ''}</td>
                      <td class="r">${e.shiftCount}</td>
                      <td class="r hide-sm">${this._hhmm(e.grossHours)}</td>
                      <td class="r hide-sm">${this._hhmm(e.breakHours)}</td>
                      <td class="r net">${this._hhmm(e.netHours)}</td>
                    </tr>
                  `)}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Totaal</td>
                    <td class="r">${sum('shiftCount')}</td>
                    <td class="r hide-sm">${this._hhmm(sum('grossHours'))}</td>
                    <td class="r hide-sm">${this._hhmm(sum('breakHours'))}</td>
                    <td class="r">${this._hhmm(sum('netHours'))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <p class="note">Per dienst gaat er een half uur pauze af.</p>
          `}
      </div>
    `;
  }
}

customElements.define('monthly-summary-page', MonthlySummaryPage);
