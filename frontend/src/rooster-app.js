import { LitElement, html, css } from 'lit';
import { authStore } from './store.js';
import './components/login-page.js';
import './components/employer-shell.js';
import './components/employee-shell.js';

async function showWindow() {
  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    await getCurrentWindow().show();
  } catch (e) {}
}

async function checkForUpdates() {
  try {
    const { check } = await import('@tauri-apps/plugin-updater');
    const { relaunch } = await import('@tauri-apps/plugin-process');
    const update = await check();
    if (update) {
      await update.downloadAndInstall();
      await relaunch();
    }
  } catch (e) {
    // niet in Tauri of update check mislukt -- geen actie nodig
  }
}
checkForUpdates();

class RoosterApp extends LitElement {
  static properties = { _user: { state: true } };
  static styles = css`:host { display: block; min-height: 100vh; }`;

  constructor() {
    super();
    this._user = authStore.user;
    authStore.addEventListener('change', () => { this._user = authStore.user; });
  }

  render() {
    if (!this._user) return html`<login-page></login-page>`;
    if (this._user.role === 'EMPLOYER') return html`<employer-shell></employer-shell>`;
    return html`<employee-shell></employee-shell>`;
  }
}

customElements.define('rooster-app', RoosterApp);

document.addEventListener('DOMContentLoaded', () => {
  showWindow();
  const splash = document.getElementById('splash');
  if (splash) {
    splash.style.transition = 'opacity 0.2s';
    splash.style.opacity = '0';
    setTimeout(() => splash.remove(), 200);
  }
});
