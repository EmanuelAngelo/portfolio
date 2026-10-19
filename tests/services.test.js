import test from 'node:test';
import assert from 'node:assert/strict';
import { readPassport, writePassport } from '../src/services/passport.js';
import { loadRepositories } from '../src/services/repositories.js';

test('Passport tolerates corrupt, unexpected, duplicated and inaccessible data', () => {
  for (const value of ['broken', '{}', 'null', '42'])
    assert.deepEqual(readPassport({ getItem: () => value }, ['energy']), []);
  assert.deepEqual(readPassport({ getItem: () => '["energy","energy","removed"]' }, ['energy']), [
    'energy',
  ]);
  assert.deepEqual(readPassport(undefined, ['energy']), []);
  assert.equal(writePassport(undefined, ['energy']), false);
  let saved;
  assert.equal(
    writePassport(
      {
        setItem: (key, value) => {
          saved = value;
        },
      },
      ['energy'],
    ),
    true,
  );
  assert.equal(saved, '["energy"]');
});

test('GitHub fallback survives unavailable Netlify endpoint and filters unsafe URLs', async () => {
  let calls = 0;
  const result = await loadRepositories(undefined, async () => {
    calls++;
    if (calls === 1) return { ok: false };
    return {
      ok: true,
      json: async () => [
        { name: 'real', html_url: 'https://github.com/EmanuelAngelo/real', language: 'Vue' },
        { name: 'bad', html_url: 'javascript:alert(1)' },
        { name: 'fork', html_url: 'https://github.com/some/fork', fork: true },
      ],
    };
  });
  assert.equal(calls, 2);
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'real');
});

test('Unavailable APIs produce a controlled error for the curated fallback', async () => {
  await assert.rejects(
    loadRepositories(undefined, async () => {
      throw new Error('offline');
    }),
    /projetos do portfólio/,
  );
});

test('Aborted requests do not proceed to the fallback endpoint', async () => {
  const controller = new AbortController();
  controller.abort();
  let calls = 0;
  await assert.rejects(
    loadRepositories(controller.signal, async () => {
      calls++;
      throw new Error('aborted');
    }),
    /aborted/,
  );
  assert.equal(calls, 1);
});
