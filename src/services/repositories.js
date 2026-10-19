/** Keep the existing Netlify integration, with a portable public GitHub fallback. */
export async function loadRepositories(signal, fetcher = fetch) {
  const endpoints = [
    '/.netlify/functions/pinned-repos?username=EmanuelAngelo',
    'https://api.github.com/users/EmanuelAngelo/repos?per_page=50&sort=updated',
  ];
  for (const endpoint of endpoints) {
    try {
      const response = await fetcher(endpoint, { signal, headers: { Accept: 'application/json' } });
      if (!response.ok) continue;
      const data = await response.json();
      const repos = Array.isArray(data) ? data : data.repos;
      if (!Array.isArray(repos)) continue;
      const result = repos
        .filter(
          (repo) =>
            !repo.fork &&
            typeof repo.html_url === 'string' &&
            repo.html_url.startsWith('https://github.com/'),
        )
        .slice(0, 5)
        .map((repo) => ({
          name: repo.name,
          description: repo.description || 'Conheça o projeto no GitHub.',
          language: repo.language || 'Projeto',
          url: repo.html_url,
        }));
      if (result.length) return result;
    } catch (error) {
      if (signal?.aborted) throw error;
    }
  }
  throw new Error(
    'Não foi possível atualizar agora. Os projetos do portfólio continuam disponíveis.',
  );
}
