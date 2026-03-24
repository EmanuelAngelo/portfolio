import { computed, ref, watch } from 'vue';

const STORAGE_KEY = 'portfolio_theme';

function getPreferredTheme() {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia?.('(prefers-color-scheme: light)')?.matches ? 'light' : 'dark';
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const saved = (localStorage.getItem(STORAGE_KEY) || '').toLowerCase();
  return saved === 'light' || saved === 'dark' ? saved : getPreferredTheme();
}

function applyThemeClass(theme) {
  const root = document.documentElement;
  root.classList.toggle('theme-light', theme === 'light');
  root.classList.toggle('theme-dark', theme === 'dark');
}

export function useTheme() {
  const theme = ref(getInitialTheme());

  if (typeof window !== 'undefined') {
    applyThemeClass(theme.value);
  }

  watch(
    theme,
    (t) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, t);
      applyThemeClass(t);
    }
  );

  const isLight = computed(() => theme.value === 'light');
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  return { theme, isLight, toggleTheme };
}
