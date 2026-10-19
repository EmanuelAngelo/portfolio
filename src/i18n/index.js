import { ref } from 'vue';
import english from './en.js';
export const locale = ref('pt-BR');
const storageKey = 'emanuel-world-language';
const normalize = (value) =>
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
export function t(value) {
  const key = normalize(value);
  return locale.value === 'en' ? (english[key] ?? key) : key;
}
export function setLocale(value) {
  locale.value = value === 'en' ? 'en' : 'pt-BR';
  if (typeof document !== 'undefined') document.documentElement.lang = locale.value;
  try {
    localStorage.setItem(storageKey, locale.value);
  } catch {
    /* Language works without storage. */
  }
}
export function initializeLocale() {
  let saved;
  try {
    saved = localStorage.getItem(storageKey);
  } catch {
    /* Default to Brazilian Portuguese. */
  }
  setLocale(saved);
}
export function useLocale() {
  return { locale, t, setLocale };
}
