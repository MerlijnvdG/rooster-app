class AuthStore extends EventTarget {
  constructor() {
    super();
    const saved = localStorage.getItem('auth');
    this._user = saved ? JSON.parse(saved) : null;
  }

  get user() { return this._user; }
  get isLoggedIn() { return !!this._user; }
  get isEmployer() { return this._user?.role === 'EMPLOYER'; }

  setUser(userData) {
    this._user = userData;
    if (userData) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('auth', JSON.stringify(userData));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
    }
    this.dispatchEvent(new CustomEvent('change'));
  }

  logout() { this.setUser(null); }
}

export const authStore = new AuthStore();
