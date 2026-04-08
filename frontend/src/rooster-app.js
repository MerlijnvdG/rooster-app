import { LitElement, html, css } from 'lit';
import { authStore } from './store.js';
import './components/login-page.js';
import './components/employer-shell.js';
import './components/employee-shell.js';

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
