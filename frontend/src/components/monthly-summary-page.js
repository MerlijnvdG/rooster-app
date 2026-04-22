import { LitElement, html, css } from 'lit';
import { getMonthlySummary } from '../api.js';
import { ChevronLeft, ChevronRight } from '../icons.js';

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

  static styles = css`
    :host { display: block; padding: 1.25rem; max-width: 900px; margin: 0 auto; }

    .top-bar {
      display: flex; align-items: center; gap: 0.75rem;
      margin-bottom: 1.5rem; flex-wrap: wrap;
    }

    .month-nav {
      display: flex; align-items: center; gap: 0.4rem; flex: 1;
    }
    .month-label {
      font-size: 1rem; font-weight: 800; color: var(--app-text-dark);
      flex: 1; text-align: center; white-space: nowrap;
    }
    .nav-arrow {
      width: 34px; height: 34px;
      border: 1.5px solid var(--app-border);
      background: #fff; border-radius: 8px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--app-text-muted);
      transition: all 0.15s; flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .nav-arrow:hover { border-color: var(--app-accent); color: var(--app-accent); }
    .nav-arrow:disabled { opacity: 0.35; cursor: not-allowed; }

    .export-btn {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: #fff; border: 1.5px solid var(--app-border);
      color: var(--app-text-muted); border-radius: 8px;
      padding: 0.45rem 0.9rem; font-size: 0.82rem; font-weight: 600;
      cursor: pointer; white-space: nowrap; transition: all 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .export-btn:hover { border-color: var(--app-accent); color: var(--app-accent); }

    /* tabel */
    .table-wrap {
      background: #fff;
      border: 1px solid var(--app-border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }

    table {
      width: 100%; border-collapse: collapse;
    }

    thead tr {
      background: var(--app-bg-light);
      border-bottom: 2px solid var(--app-border);
    }

    th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-size: 0.7rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.5px;
      color: var(--app-text-muted);
      white-space: nowrap;
    }
    th.right { text-align: right; }

    tbody tr {
      border-bottom: 1px solid var(--app-border);
      transition: background 0.12s;
    }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #fafbfc; }

    td {
      padding: 0.8rem 1rem;
      font-size: 0.9rem; color: var(--app-text-dark);
    }
    td.right { text-align: right; }
    td.muted  { color: var(--app-text-muted); }
    td.net    { font-weight: 700; }

    /* totaal */
    tfoot tr {
      background: var(--app-bg-light);
      border-top: 2px solid var(--app-border);
    }
    tfoot td {
      padding: 0.75rem 1rem;
      font-size: 0.88rem; font-weight: 700;
      color: var(--app-text-dark);
    }
    tfoot td.right { text-align: right; }

    /* pauze kolom weg op mobiel */
    @media (max-width: 520px) {
      .col-break { display: none; }
      th, td { padding-left: 0.75rem; padding-right: 0.75rem; }
    }

    .empty { text-align: center; padding: 3rem 1rem; color: var(--app-text-muted); font-size: 0.9rem; }
    .error-bar {
      background: #ffebee; border: 1px solid rgba(211,47,47,0.2);
      color: #C62828; border-radius: 8px; padding: 0.75rem 1rem;
      font-size: 0.84rem; margin-bottom: 1rem;
    }
    .loading { padding: 2rem; text-align: center; color: var(--app-text-muted); }
  `;

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
      this._error = e.message || 'Kon overzicht niet laden.';
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
    const totalShifts = this._data.reduce((s, e) => s + e.shiftCount, 0);
    const totalGross  = this._data.reduce((s, e) => s + e.grossHours, 0);
    const totalBreak  = this._data.reduce((s, e) => s + e.breakHours, 0);
    const totalNet    = this._data.reduce((s, e) => s + e.netHours,   0);

    return html`
      <div class="top-bar">
        <div class="month-nav">
          <button class="nav-arrow" @click=${this._prevMonth}>${ChevronLeft(15)}</button>
          <div class="month-label">${MONTHS[this._month - 1]} ${this._year}</div>
          <button class="nav-arrow" @click=${this._nextMonth} ?disabled=${this._isCurrentMonth()}>
            ${ChevronRight(15)}
          </button>
        </div>
        ${!this._loading && this._data.length > 0 ? html`
          <button class="export-btn" @click=${this._exportCSV}>Exporteer CSV</button>
        ` : ''}
      </div>

      ${this._error ? html`<div class="error-bar">${this._error}</div>` : ''}

      <div class="table-wrap">
        ${this._loading ? html`<div class="loading">Laden...</div>` :
          this._data.length === 0 ? html`<div class="empty">Geen diensten gevonden in ${MONTHS[this._month - 1]} ${this._year}.</div>` : html`
          <table>
            <thead>
              <tr>
                <th>Medewerker</th>
                <th class="right">Diensten</th>
                <th class="right">Bruto</th>
                <th class="right col-break">Pauze</th>
                <th class="right">Netto</th>
              </tr>
            </thead>
            <tbody>
              ${this._data.map(e => html`
                <tr>
                  <td>
                    <div>${e.employeeName}</div>
                    ${e.locationName ? html`<div style="font-size:0.76rem;color:var(--app-text-muted,#626B74)">${e.locationName}</div>` : ''}
                  </td>
                  <td class="right muted">${e.shiftCount}</td>
                  <td class="right muted">${this._hhmm(e.grossHours)}</td>
                  <td class="right muted col-break">-${this._hhmm(e.breakHours)}</td>
                  <td class="right net">${this._hhmm(e.netHours)}</td>
                </tr>
              `)}
            </tbody>
            <tfoot>
              <tr>
                <td>Totaal</td>
                <td class="right">${totalShifts}</td>
                <td class="right">${this._hhmm(totalGross)}</td>
                <td class="right col-break">-${this._hhmm(totalBreak)}</td>
                <td class="right">${this._hhmm(totalNet)}</td>
              </tr>
            </tfoot>
          </table>
        `}
      </div>
    `;
  }
}

customElements.define('monthly-summary-page', MonthlySummaryPage);
