const STORAGE_KEY = 'theme';

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}

function getPreferred() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// meteen zetten, anders flitst hij eerst even licht
applyTheme(getPreferred());

// os volgen zolang je zelf niks gekozen hebt
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches);
});

export const themeStore = {
  get isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  },
  toggle() {
    const next = !this.isDark;
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    document.dispatchEvent(new CustomEvent('theme-change'));
  },
};
