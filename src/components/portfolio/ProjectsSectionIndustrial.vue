<template>
  <section id="projects" ref="target" class="relative py-32 px-6 blueprint-grid">
    <div class="max-w-7xl mx-auto">
      <div
        class="mb-20 transition-all duration-700"
        :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
      >
        <span class="font-mono text-xs tracking-widest text-gold/60 uppercase">{{ $t('industrial.projects.label') }}</span>
        <h2 class="mt-4 text-4xl md:text-6xl font-inter font-black tracking-tight">
          {{ $t('industrial.projects.headingA') }} <span class="text-gold">{{ $t('industrial.projects.headingB') }}</span>
        </h2>
        <p class="mt-4 text-lg text-foreground/40">{{ $t('industrial.projects.headingC') }}</p>
      </div>

      <div
        class="transition-all duration-700"
        :class="inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        style="transition-delay: 140ms"
      >
        <div v-if="isLoading" class="border border-border/10 bg-card/10 p-6">
          <div class="flex items-center gap-3 text-foreground/50">
            <Github :size="18" class="text-gold/70" />
            <span class="font-mono text-xs tracking-widest">{{ $t('industrial.projects.loading') }}</span>
          </div>
        </div>

        <div v-else-if="error" class="border border-border/10 bg-card/10 p-6">
          <div class="font-mono text-xs tracking-widest text-gold/70 mb-2">{{ $t('industrial.projects.error') }}</div>
          <div class="text-sm text-foreground/50 leading-relaxed">{{ error }}</div>
        </div>

        <div v-else-if="repos.length === 0" class="border border-border/10 bg-card/10 p-6">
          <div class="font-mono text-xs tracking-widest text-foreground/50">{{ $t('industrial.projects.empty') }}</div>
        </div>

        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            v-for="repo in repos"
            :key="repo.id"
            :href="repo.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative p-6 border border-border/10 bg-card/20 hover:border-gold/30 hover:bg-card/40 transition-all overflow-hidden"
          >
            <div class="absolute -top-12 -right-12 w-24 h-24 bg-gold/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div class="flex items-start justify-between gap-4">
              <h3 class="font-inter font-semibold text-foreground text-lg tracking-tight min-w-0 truncate">
                {{ repo.name }}
              </h3>
              <ExternalLink :size="16" class="flex-shrink-0 text-foreground/30 group-hover:text-gold transition-colors" />
            </div>

            <p class="mt-2 text-sm text-foreground/40 leading-relaxed line-clamp-3">
              {{ repo.description || $t('industrial.projects.noDescription') }}
            </p>

            <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span v-if="repo.language" class="font-mono text-xs tracking-wider text-gold/70">
                {{ repo.language }}
              </span>

              <span class="inline-flex items-center gap-1.5 font-mono text-xs text-foreground/40">
                <Star :size="14" class="text-gold/60" />
                {{ repo.stargazers_count }}
              </span>

              <span class="inline-flex items-center gap-1.5 font-mono text-xs text-foreground/40">
                <GitFork :size="14" class="text-gold/60" />
                {{ repo.forks_count }}
              </span>
            </div>

            <div class="mt-5 pt-4 border-t border-border/10 flex items-center justify-between gap-3">
              <span class="font-mono text-xs text-foreground/30 tracking-wider">
                {{ $t('industrial.projects.updated') }}: {{ formatDate(repo.pushed_at || repo.updated_at) }}
              </span>
              <span class="font-mono text-xs tracking-widest text-gold/60 uppercase">{{ $t('industrial.projects.viewRepo') }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ExternalLink, GitFork, Github, Star } from 'lucide-vue-next';
import { useInViewOnce } from '../../composables/useInViewOnce';

const { target, inView } = useInViewOnce({ rootMargin: '-120px' });

const username = 'EmanuelAngelo';

const repos = ref([]);
const isLoading = ref(true);
const error = ref('');

const { locale } = useI18n();

const dateFormatter = computed(() => {
  return new Intl.DateTimeFormat(String(locale.value || 'pt'), {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
});

function formatDate(value) {
  try {
    return dateFormatter.value.format(new Date(value));
  } catch {
    return '';
  }
}

async function loadRepos() {
  isLoading.value = true;
  error.value = '';

  try {
    // 1) Prefer pinned repos (server-side via Netlify Function to avoid CORS)
    let pinnedData = null;
    try {
      const pinnedRes = await fetch(
        `/.netlify/functions/pinned-repos?username=${encodeURIComponent(username)}&t=${Date.now()}`,
        { cache: 'no-store' }
      );
      if (pinnedRes.ok) pinnedData = await pinnedRes.json();
    } catch {
      pinnedData = null;
    }

    const pinnedRepos = Array.isArray(pinnedData?.repos) ? pinnedData.repos : [];
    if (pinnedRepos.length > 0) {
      repos.value = pinnedRepos.slice(0, 5);
      return;
    }

    // 2) Fallback: latest updated repos (works everywhere)
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=50&sort=updated`, {
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (!res.ok) throw new Error(`GitHub API error (${res.status})`);

    const data = await res.json();
    const nonForks = Array.isArray(data) ? data.filter((r) => !r.fork) : [];
    repos.value = nonForks
      .sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at))
      .slice(0, 5);
  } catch (e) {
    error.value = e?.message || String(e);
    repos.value = [];
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadRepos();
});
</script>
