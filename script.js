const themeToggleButton = document.querySelector('.theme-toggle');
const rootElement = document.documentElement;
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const themeStorageKey = 'theme-preference';

function updateToggleButton(theme) {
  const isDark = theme === 'dark';
  themeToggleButton.classList.toggle('theme-toggle--active', isDark);
  themeToggleButton.setAttribute('aria-pressed', String(isDark));
}

function applyTheme(theme, savePreference = true) {
  rootElement.dataset.theme = theme;
  updateToggleButton(theme);

  if (savePreference) {
    localStorage.setItem(themeStorageKey, theme);
  }
}

const savedPreference = localStorage.getItem(themeStorageKey);
const initialTheme = savedPreference === 'light' || savedPreference === 'dark'
  ? savedPreference
  : (systemThemeQuery.matches ? 'dark' : 'light');

applyTheme(initialTheme, false);

themeToggleButton.addEventListener('click', () => {
  const nextTheme = rootElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
});
