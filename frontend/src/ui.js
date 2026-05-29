import { css } from 'lit';

// gedeelde stijlen, elke component zet deze voor zijn eigen styles
export const base = css`
  :host { font-family: var(--font-body); color: var(--app-text-dark); }

  h1, h2, h3 { font-family: var(--font-head); font-stretch: 88%; font-weight: 650; line-height: 1.15; }

  .page { max-width: 1080px; margin: 0 auto; padding: 1.75rem 1.5rem 3rem; }
  .page-narrow { max-width: 640px; }

  .page-head {
    display: flex; align-items: flex-end; justify-content: space-between;
    gap: 1rem; flex-wrap: wrap; margin-bottom: 1.25rem;
  }
  .page-head h1 { font-size: 1.75rem; }
  .page-head .sub { color: var(--app-text-muted); font-size: 0.9rem; margin-top: 0.2rem; }
  .actions { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }

  .mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
  .muted { color: var(--app-text-muted); }

  /* knoppen */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
    font: inherit; font-size: 0.9rem; font-weight: 600;
    padding: 0.5rem 0.95rem; border-radius: var(--radius-md);
    border: 1px solid var(--app-border); background: var(--app-bg-main); color: var(--app-text-dark);
    cursor: pointer; white-space: nowrap; transition: background var(--transition), border-color var(--transition);
  }
  .btn:hover:not(:disabled) { border-color: var(--app-text-muted); }
  .btn:disabled { opacity: 0.55; cursor: not-allowed; }
  .btn-primary { background: var(--app-accent); border-color: var(--app-accent); color: #fff; }
  .btn-primary:hover:not(:disabled) { background: var(--app-accent-hover); border-color: var(--app-accent-hover); }
  .btn-danger { color: var(--app-discount); }
  .btn-danger:hover:not(:disabled) { border-color: var(--app-discount); }
  .btn-danger.solid { background: var(--app-discount); border-color: var(--app-discount); color: #fff; }
  .btn-text { border-color: transparent; background: none; color: var(--app-accent); padding-left: 0.4rem; padding-right: 0.4rem; }
  .btn-text:hover:not(:disabled) { border-color: transparent; text-decoration: underline; }

  .icon-btn {
    width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;
    border: none; background: var(--app-icon-btn-bg); color: var(--app-text-muted);
    border-radius: var(--radius-md); cursor: pointer; flex-shrink: 0;
  }
  .icon-btn:hover { background: var(--app-icon-btn-hover); color: var(--app-text-dark); }
  .icon-btn.del:hover { color: var(--app-discount); }

  /* formulieren */
  .field { display: flex; flex-direction: column; gap: 0.3rem; margin-bottom: 1rem; }
  .field label, .label { font-size: 0.85rem; font-weight: 600; }
  .field .hint { font-size: 0.8rem; color: var(--app-text-muted); }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  input, select, textarea {
    font: inherit; font-size: 16px; color: var(--app-text-dark);
    background: var(--app-bg-main); border: 1px solid var(--app-border);
    border-radius: var(--radius-md); padding: 0.5rem 0.65rem; width: 100%;
  }
  input:focus, select:focus, textarea:focus { outline: none; border-color: var(--app-accent); box-shadow: 0 0 0 3px var(--app-accent-light); }
  input[type="time"], input[type="date"] { font-family: var(--font-mono); }
  textarea { resize: vertical; min-height: 4.5rem; }

  /* meldingen en lege staat */
  .error-bar {
    border-left: 3px solid var(--app-discount); background: var(--app-discount-light);
    color: var(--app-discount); padding: 0.55rem 0.8rem; border-radius: var(--radius-sm);
    font-size: 0.88rem; margin-bottom: 1rem;
  }
  .ok-bar {
    border-left: 3px solid var(--app-success); background: var(--app-success-light);
    color: var(--app-success); padding: 0.55rem 0.8rem; border-radius: var(--radius-sm);
    font-size: 0.88rem; margin-bottom: 1rem;
  }
  .empty { padding: 2.5rem 1rem; text-align: center; color: var(--app-text-muted); }
  .empty strong { display: block; color: var(--app-text-dark); font-size: 1rem; margin-bottom: 0.2rem; }
  .loading { padding: 2rem 0; color: var(--app-text-muted); font-size: 0.9rem; }

  /* vlak met rand, geen schaduw */
  .panel { background: var(--app-bg-main); border: 1px solid var(--app-border); border-radius: var(--radius-lg); }

  /* status: gekleurd puntje + tekst */
  .status { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.82rem; font-weight: 600; white-space: nowrap; }
  .status::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
  .status.pending { color: var(--app-warning); }
  .status.approved { color: var(--app-approved); }
  .status.rejected { color: var(--app-discount); }

  /* modal */
  .overlay {
    position: fixed; inset: 0; z-index: 1000; background: rgba(20,24,28,0.45);
    display: flex; align-items: center; justify-content: center; padding: 1rem;
  }
  .sheet {
    background: var(--app-bg-main); border-radius: var(--radius-lg); box-shadow: var(--app-shadow-modal);
    width: 100%; max-width: 460px; max-height: calc(100vh - 2rem); overflow: auto;
  }
  .sheet-head {
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    padding: 1rem 1.25rem 0.25rem;
  }
  .sheet-head h2 { font-size: 1.25rem; }
  .sheet-body { padding: 0.75rem 1.25rem 0.5rem; }
  .sheet-foot { display: flex; justify-content: flex-end; gap: 0.5rem; padding: 0.75rem 1.25rem 1.1rem; }

  @media (max-width: 600px) {
    .page { padding: 1.1rem 1rem 2.5rem; }
    .page-head h1 { font-size: 1.45rem; }
    .overlay { align-items: flex-end; padding: 0; }
    .sheet { max-width: none; border-radius: var(--radius-lg) var(--radius-lg) 0 0; max-height: 92vh; }
    .sheet-foot { padding-bottom: max(1.1rem, env(safe-area-inset-bottom)); }
  }
`;
