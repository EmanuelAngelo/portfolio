import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { zones } from '../src/data/zones.js';
import english from '../src/i18n/en.js';
import { locale, t, setLocale, initializeLocale } from '../src/i18n/index.js';

test('Both languages cover every authored experience, role, date and project description', () => {
  setLocale('en');
  for (const zone of zones) {
    const phrases = [zone.name, zone.title, zone.intro];
    for (const job of zone.jobs ?? []) phrases.push(job.period, job.role, job.description);
    for (const project of zone.projects ?? []) phrases.push(project.description);
    for (const phrase of phrases) {
      if (['IT Supervisor', 'IT Specialist'].includes(phrase)) continue;
      assert.ok(Object.hasOwn(english, phrase), `Missing English: ${phrase}`);
      assert.notEqual(t(phrase), phrase);
    }
  }
  setLocale('pt-BR');
  assert.equal(t(zones[0].title), zones[0].title);
});

test('Every static interface translation has an English entry', () => {
  for (const file of [
    'App.vue',
    'components/layout/LanguageSwitch.vue',
    'components/layout/WorldHeader.vue',
    'components/layout/WorldIntro.vue',
    'components/world/WorldHud.vue',
    'components/world/TouchControls.vue',
    'components/content/ContentDialog.vue',
    'components/content/ProjectsList.vue',
  ]) {
    const source = readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8');
    for (const match of source.matchAll(/\bt\(\s*'([^']+)'\s*[,)]/g)) {
      assert.ok(Object.hasOwn(english, match[1]), `${file}: missing ${match[1]}`);
    }
  }
});

test('Language persists, restores and tolerates unavailable storage', () => {
  let saved = 'en';
  globalThis.localStorage = {
    getItem: () => saved,
    setItem: (_key, value) => {
      saved = value;
    },
  };
  initializeLocale();
  assert.equal(locale.value, 'en');
  setLocale('pt-BR');
  assert.equal(saved, 'pt-BR');
  setLocale('invalid');
  assert.equal(locale.value, 'pt-BR');
  globalThis.localStorage = {
    getItem() {
      throw new Error('blocked');
    },
    setItem() {
      throw new Error('blocked');
    },
  };
  initializeLocale();
  setLocale('en');
  assert.equal(t('Abrir mapa'), 'Open map');
  delete globalThis.localStorage;
  setLocale('pt-BR');
});
