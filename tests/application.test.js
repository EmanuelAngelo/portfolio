import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';

test('Vue application renders the complete world interface without setup errors', async () => {
  const directory = await mkdtemp(resolve('.qa-'));
  try {
    await build({
      configFile: false,
      plugins: [vue()],
      logLevel: 'silent',
      build: { ssr: 'src/App.vue', outDir: directory, minify: false },
    });
    const { default: App } = await import(pathToFileURL(join(directory, 'App.js')).href);
    const html = await renderToString(createSSRApp(App));
    assert.match(html, /Cada experiência/);
    assert.match(html, /Explorar mapa/);
    assert.match(html, /Controles de movimento/);
    assert.equal((html.match(/class="pin"/g) || []).length, 6);
    assert.match(html, /aria-labelledby="dialog-title"/);
    assert.match(html, /SEU PASSAPORTE/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
