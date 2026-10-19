import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Window } from 'happy-dom';
import { createWorldRenderer } from '../src/game/renderer.js';

test('Mounted application responds to keyboard, touch, click navigation and explicit interaction', async () => {
  const window = new Window({ width: 390, height: 844 });
  for (const key of [
    'window',
    'document',
    'HTMLElement',
    'Element',
    'SVGElement',
    'Node',
    'navigator',
  ])
    Object.defineProperty(globalThis, key, {
      value: key === 'window' ? window : key === 'document' ? window.document : window[key],
      configurable: true,
    });
  const callbacks = new Map();
  let sequence = 0;
  let clock = 100;
  globalThis.requestAnimationFrame = (fn) => {
    callbacks.set(++sequence, fn);
    return sequence;
  };
  globalThis.cancelAnimationFrame = (id) => callbacks.delete(id);
  window.HTMLElement.prototype.setPointerCapture = () => {};
  const errors = [];
  const directory = await mkdtemp(resolve('.qa-controls-'));
  let app;
  try {
    const { build } = await import('vite');
    const { default: vuePlugin } = await import('@vitejs/plugin-vue');
    await build({
      configFile: false,
      plugins: [vuePlugin()],
      logLevel: 'silent',
      build: {
        outDir: directory,
        lib: { entry: resolve('src/App.vue'), formats: ['es'], fileName: () => 'app.js' },
        rollupOptions: { external: ['vue'] },
      },
    });
    const { createApp, nextTick } = await import('vue');
    const { default: App } = await import(pathToFileURL(join(directory, 'app.js')).href);
    const root = document.createElement('div');
    document.body.append(root);
    app = createApp(App);
    // DOM input is real; only the GPU adapter is substituted in this Node environment.
    app.provide('worldRendererFactory', (canvas, zones) =>
      createWorldRenderer(canvas, zones, () => ({
        shadowMap: {},
        setPixelRatio() {},
        setSize() {},
        render() {},
        dispose() {},
      })),
    );
    app.config.errorHandler = (error) => errors.push(error);
    app.mount(root);
    async function tick(count = 1) {
      for (let n = 0; n < count; n++) {
        clock += 16.67;
        const work = [...callbacks.values()];
        callbacks.clear();
        for (const fn of work) fn(clock);
        await nextTick();
      }
    }
    const position = () => {
      const marker = document.querySelector('.map svg > circle');
      return [Number(marker.getAttribute('cx')), Number(marker.getAttribute('cy'))];
    };
    await tick(2);
    assert.equal(
      document.querySelectorAll('.pin').length,
      0,
      'No building labels before proximity',
    );
    const original = position();
    window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'd', code: 'KeyD' }));
    await tick(12);
    window.dispatchEvent(new window.KeyboardEvent('keyup', { key: 'd', code: 'KeyD' }));
    assert.notDeepEqual(position(), original, 'WASD must change the actual mounted player');
    const beforeClick = position();
    document.querySelector('canvas').dispatchEvent(
      new window.PointerEvent('pointerdown', {
        bubbles: true,
        pointerType: 'mouse',
        clientX: 240,
        clientY: 500,
      }),
    );
    await tick(12);
    assert.notDeepEqual(position(), beforeClick, 'Mouse click after WASD must move the player');
    assert.ok(callbacks.size > 0, 'Animation must continue after clicking');
    const afterKeyboard = position();
    const up = document.querySelector('[aria-label="Mover para cima"]');
    up.dispatchEvent(new window.PointerEvent('pointerdown', { bubbles: true, pointerId: 1 }));
    await tick(12);
    up.dispatchEvent(new window.PointerEvent('pointerup', { bubbles: true, pointerId: 1 }));
    assert.notDeepEqual(position(), afterKeyboard, 'Touch control must move the player');
    const stopped = position();
    await tick(10);
    assert.deepEqual(position(), stopped, 'Release must stop movement');
    document.querySelector('nav button').click();
    await nextTick();
    assert.ok(document.querySelector('dialog').open);
    document.querySelector('.zoneList button').click();
    await nextTick();
    await tick(650);
    assert.equal(
      document.querySelector('dialog').open,
      false,
      'Walking to an entrance must not open details',
    );
    assert.ok(
      document.querySelector('.interact button'),
      'An explicit entrance action must be available',
    );
    window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'e', code: 'KeyE' }));
    await nextTick();
    assert.equal(document.querySelector('dialog').open, true, 'E opens the nearby entrance');
    assert.match(document.querySelector('#dialog-title').textContent, /energia/i);
    document.querySelector('.close').click();
    await nextTick();
    await tick(2);
    const afterDialog = position();
    window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await tick(6);
    window.dispatchEvent(new window.KeyboardEvent('keyup', { key: 'ArrowDown' }));
    assert.notDeepEqual(position(), afterDialog, 'Arrows must resume after closing a dialog');
    window.happyDOM.setWindowSize({ width: 1440, height: 900 });
    window.dispatchEvent(new window.Event('resize'));
    await tick(2);
    const desktopPosition = position();
    window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await tick(10);
    window.dispatchEvent(new window.KeyboardEvent('keyup', { key: 'ArrowLeft' }));
    assert.notDeepEqual(position(), desktopPosition, 'Desktop keyboard must move the player');
    assert.equal(document.querySelector('main').classList.contains('compact-game'), false);
    const canvas = document.querySelector('canvas');
    canvas.dispatchEvent(new window.Event('webglcontextlost', { cancelable: true }));
    await nextTick();
    assert.ok(
      document.querySelector('.canvas-fallback'),
      'GPU loss must expose accessible content',
    );
    assert.equal(callbacks.size, 0, 'GPU loss must stop animation');
    document.querySelector('nav button').click();
    await nextTick();
    document.querySelector('.zoneList button').click();
    await nextTick();
    assert.match(
      document.querySelector('#dialog-title').textContent,
      /energia/i,
      'Fallback opens content without walking',
    );
    document.querySelector('.close').click();
    await nextTick();
    canvas.dispatchEvent(new window.Event('webglcontextrestored'));
    await tick(2);
    assert.equal(document.querySelector('.canvas-fallback'), null);
    assert.ok(callbacks.size > 0, 'Restoring WebGL must resume animation');
    const beforeLanguage = position();
    const language = document.querySelector('header select');
    language.value = 'en';
    language.dispatchEvent(new window.Event('change', { bubbles: true }));
    await nextTick();
    assert.equal(document.documentElement.lang, 'en');
    assert.match(document.querySelector('h1').textContent, /Discover my journey/);
    assert.deepEqual(position(), beforeLanguage, 'Switching languages must not reset the player');
    document.querySelector('nav button').click();
    await nextTick();
    assert.match(document.querySelector('#dialog-title').textContent, /One map/);
    assert.match(document.querySelector('.zoneList').textContent, /Army Base/);
    canvas.dispatchEvent(new window.Event('webglcontextlost', { cancelable: true }));
    await nextTick();
    document.querySelector('.zoneList button:last-child').click();
    await nextTick();
    assert.match(document.querySelector('dialog').textContent, /Soldier/);
    assert.match(document.querySelector('dialog').textContent, /Training and operational routines/);
    const dialogLanguage = document.querySelector('dialog select');
    dialogLanguage.value = 'pt-BR';
    dialogLanguage.dispatchEvent(new window.Event('change', { bubbles: true }));
    await nextTick();
    assert.match(document.querySelector('dialog').textContent, /Soldado/);
    assert.equal(document.documentElement.lang, 'pt-BR');
    assert.deepEqual(errors, []);
    app.unmount();
    app = null;
    assert.equal(callbacks.size, 0, 'Animation must be disposed');
  } finally {
    app?.unmount();
    await rm(directory, { recursive: true, force: true });
    window.happyDOM.abort();
  }
});
