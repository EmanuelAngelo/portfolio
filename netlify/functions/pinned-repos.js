export const handler = async (event) => {
  const username = event?.queryStringParameters?.username || 'EmanuelAngelo';

  try {
    const profileRes = await fetch(`https://github.com/${encodeURIComponent(username)}?t=${Date.now()}`, {
      headers: {
        'User-Agent': 'portfolio-netlify-function',
        Accept: 'text/html,application/xhtml+xml',
      },
      cache: 'no-store',
    });

    if (!profileRes.ok) {
      return {
        statusCode: 502,
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ error: `GitHub profile fetch failed (${profileRes.status})` }),
      };
    }

    const html = await profileRes.text();

    // Extract pinned repo slugs from pinned list items.
    // GitHub markup can change; keep this tolerant and scoped.
    const pinnedItems = html.match(/pinned-item-list-item[\s\S]*?<\/li>/gi) || [];
    const pinnedPairs = pinnedItems
      .map((chunk) => {
        const m = chunk.match(new RegExp(`href=\\"\\/(${username})\\/([A-Za-z0-9_.-]+)\\"`, 'i'));
        if (!m) return null;
        return { owner: m[1], name: m[2] };
      })
      .filter(Boolean);

    const unique = [];
    const seen = new Set();
    for (const p of pinnedPairs) {
      const key = `${p.owner}/${p.name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(p);
    }

    const pinned = unique.slice(0, 6);

    const repos = (await Promise.all(
      pinned.map(async (r) => {
        const apiRes = await fetch(
          `https://api.github.com/repos/${encodeURIComponent(r.owner)}/${encodeURIComponent(r.name)}?t=${Date.now()}`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              'User-Agent': 'portfolio-netlify-function',
            },
            cache: 'no-store',
          }
        );
        if (!apiRes.ok) return null;
        return apiRes.json();
      })
    ))
      .filter(Boolean);

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store, max-age=0',
      },
      body: JSON.stringify({ repos }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: e?.message || String(e) }),
    };
  }
};
