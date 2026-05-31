import { css, html } from 'lit';

// tijd als "09:30:00" naar minuten
const mins = (t) => { const [h, m] = t.slice(0, 5).split(':').map(Number); return h * 60 + m; };

// standaard 8 tot 20 uur, ruimer als er diensten buiten vallen
export function hourRange(shifts) {
  let from = 8, to = 20;
  for (const s of shifts) {
    from = Math.min(from, Math.floor(mins(s.startTime) / 60));
    to = Math.max(to, Math.ceil(mins(s.endTime) / 60));
  }
  return { from, to };
}

export function barPos(s, { from, to }) {
  const span = (to - from) * 60;
  const left = (mins(s.startTime) - from * 60) / span * 100;
  const width = (mins(s.endTime) - mins(s.startTime)) / span * 100;
  return `left:${left}%;width:${width}%`;
}

const MONTHS = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
export const shortDate = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;

export function ruler({ from, to }) {
  const hours = [];
  for (let h = from; h <= to; h++) hours.push(h);
  const span = to - from;
  return html`
    <div class="ruler">
      ${hours.map(h => html`<span class="tick ${h % 2 ? 'odd' : ''}" style="left:${(h - from) / span * 100}%">${String(h).padStart(2, '0')}</span>`)}
    </div>`;
}

export const timelineStyles = css`
  .tl { border: 1px solid var(--app-border); border-radius: var(--radius-lg); background: var(--app-bg-main); overflow: hidden; }

  .tl-head, .tl-row { display: grid; grid-template-columns: 96px 1fr 44px; }
  .tl-head { border-bottom: 1px solid var(--app-border); background: var(--app-card-header); }
  .tl-head .tl-track { height: 28px; }

  .ruler { position: absolute; inset: 0; }
  .tick {
    position: absolute; top: 7px; transform: translateX(-50%);
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--app-text-muted);
  }
  .tick:first-child { transform: none; }
  .tick:last-child { transform: translateX(-100%); }

  .tl-row { border-bottom: 1px solid var(--app-border); min-height: 56px; }
  .tl-row:last-child { border-bottom: none; }

  .tl-day { padding: 0.6rem 0 0.6rem 0.85rem; display: flex; flex-direction: column; justify-content: center; }
  .tl-dayname { font-family: var(--font-head); font-stretch: 88%; font-weight: 650; font-size: 0.98rem; }
  .tl-date { font-size: 0.8rem; color: var(--app-text-muted); }
  .tl-row.today { background: var(--app-today); }
  .tl-row.today .tl-date { color: var(--app-text-dark); }

  .tl-track {
    position: relative; padding: 8px 0;
    background-image: linear-gradient(to right, var(--app-border) 1px, transparent 1px);
  }
  .tl-row .tl-track { background-image: linear-gradient(to right, color-mix(in srgb, var(--app-border) 55%, transparent) 1px, transparent 1px); }

  .lane { position: relative; height: 30px; margin-bottom: 4px; }
  .lane:last-child { margin-bottom: 0; }

  .bar {
    position: absolute; top: 0; bottom: 0; min-width: 6px;
    display: flex; align-items: center; gap: 0.45rem; overflow: hidden;
    padding: 0 0.5rem; border-radius: 3px; border-left: 3px solid var(--c);
    background: color-mix(in srgb, var(--c) 14%, var(--app-bg-main));
    font-size: 0.82rem; white-space: nowrap; color: var(--app-text-dark);
    font: inherit; font-size: 0.82rem; text-align: left; border-top: 0; border-right: 0; border-bottom: 0;
  }
  button.bar { cursor: pointer; }
  button.bar:hover { background: color-mix(in srgb, var(--c) 24%, var(--app-bg-main)); }
  .bar .who { font-weight: 700; overflow: hidden; text-overflow: ellipsis; }
  .bar .when { font-family: var(--font-mono); font-size: 0.74rem; color: var(--app-text-muted); }
  .bar.mine { background: var(--app-marker); border-left-color: var(--app-marker-ink); color: var(--app-marker-ink); }
  .bar.mine .when { color: var(--app-marker-ink); }

  .tl-note { font-size: 0.85rem; color: var(--app-text-muted); align-self: center; padding-left: 0.25rem; }
  .tl-row.closed { background: repeating-linear-gradient(135deg, transparent 0 8px, var(--app-card-header) 8px 9px); }
  .tl-row.closed .tl-track { background-image: none; display: flex; }

  .tl-add { display: flex; align-items: center; justify-content: center; }

  @media (max-width: 600px) {
    .tl-head, .tl-row { grid-template-columns: 1fr 40px; }
    .tl-head .tl-day { display: none; }
    .tl-head .tl-track { grid-column: 1; }
    .tl-row .tl-day { grid-column: 1 / -1; flex-direction: row; align-items: baseline; gap: 0.5rem; padding: 0.55rem 0.75rem 0; }
    .tl-row .tl-track { grid-column: 1; margin-left: 0.75rem; }
    .tick.odd { display: none; }
    .bar .when { display: none; }
  }
`;
