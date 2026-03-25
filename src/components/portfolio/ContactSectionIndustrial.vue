<template>
  <section id="contact" ref="target" class="relative py-32 px-6 blueprint-grid">
    <div class="max-w-5xl mx-auto">
      <div
        class="mb-20 transition-all duration-700"
        :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
      >
        <span class="font-mono text-xs tracking-widest text-gold/60 uppercase">{{ $t('industrial.contact.label') }}</span>
        <h2 class="mt-4 text-4xl md:text-6xl font-inter font-black tracking-tight">
          {{ $t('industrial.contact.headingA') }} <span class="text-gold">{{ $t('industrial.contact.headingB') }}</span>
        </h2>
        <p class="mt-4 text-lg text-foreground/40">{{ $t('industrial.contact.headingC') }}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <form
          @submit.prevent="handleSubmit"
          class="space-y-4 transition-all duration-700"
          :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          style="transition-delay: 160ms"
        >
          <div>
            <label class="font-mono text-xs tracking-widest text-foreground/40 uppercase mb-2 block">{{ $t('industrial.contact.name') }}</label>
            <input
              v-model.trim="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-card/30 border border-border/10 text-foreground font-mono text-sm focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors placeholder:text-foreground/20"
              :placeholder="$t('industrial.contact.namePh')"
            />
          </div>

          <div>
            <label class="font-mono text-xs tracking-widest text-foreground/40 uppercase mb-2 block">{{ $t('industrial.contact.email') }}</label>
            <input
              v-model.trim="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-card/30 border border-border/10 text-foreground font-mono text-sm focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors placeholder:text-foreground/20"
              :placeholder="$t('industrial.contact.emailPh')"
            />
          </div>

          <div>
            <label class="font-mono text-xs tracking-widest text-foreground/40 uppercase mb-2 block">{{ $t('industrial.contact.message') }}</label>
            <textarea
              v-model.trim="form.message"
              required
              rows="5"
              class="w-full px-4 py-3 bg-card/30 border border-border/10 text-foreground font-mono text-sm focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors resize-none placeholder:text-foreground/20"
              :placeholder="$t('industrial.contact.messagePh')"
            />
          </div>

          <button
            type="submit"
            class="group flex items-center gap-3 px-6 py-3 bg-gold text-obsidian font-mono text-sm tracking-widest uppercase font-semibold hover:bg-gold/90 transition-colors"
          >
            {{ sent ? $t('industrial.contact.sent') : $t('industrial.contact.send') }}
            <Send :size="14" class="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div
          class="space-y-8 transition-all duration-700"
          :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
          style="transition-delay: 260ms"
        >
          <div class="industrial-card p-6 border border-border/10 bg-card/10">
            <div class="font-mono text-xs text-foreground/30 mb-4 tracking-wider">{{ $t('industrial.contact.connect') }}</div>
            <div class="space-y-4">
              <a
                :href="linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 text-foreground/60 hover:text-gold transition-colors group"
              >
                <div class="w-10 h-10 flex items-center justify-center border border-border/10 group-hover:border-gold/30 transition-colors">
                  <Linkedin :size="16" />
                </div>
                <div>
                  <div class="font-mono text-xs tracking-wider">LinkedIn</div>
                  <div class="font-mono text-xs text-foreground/30">/in/emanuelangelo</div>
                </div>
              </a>

              <div class="flex items-center gap-3 text-foreground/60">
                <div class="w-10 h-10 flex items-center justify-center border border-border/10">
                  <MapPin :size="16" />
                </div>
                <div>
                  <div class="font-mono text-xs tracking-wider">{{ $t('industrial.contact.location') }}</div>
                  <div class="font-mono text-xs text-foreground/30">São Luís, MA - Brasil</div>
                </div>
              </div>

              <div class="flex items-center gap-3 text-foreground/60">
                <div class="w-10 h-10 flex items-center justify-center border border-border/10">
                  <Mail :size="16" />
                </div>
                <div>
                  <div class="font-mono text-xs tracking-wider">{{ $t('industrial.contact.status') }}</div>
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-lime pulse-glow" />
                    <span class="font-mono text-xs text-lime">{{ $t('industrial.contact.open') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="industrial-card p-4 border border-border/10 bg-obsidian font-mono text-xs">
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-border/10">
              <div class="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div class="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span class="ml-2 text-foreground/20">terminal</span>
            </div>
            <div class="space-y-1 text-foreground/40">
              <div><span class="text-gold">$</span> python manage.py runserver</div>
              <div class="text-lime">System check identified no issues.</div>
              <div><span class="text-gold">$</span> npm run build</div>
              <div class="text-lime">Build successful. Ready to deploy.</div>
              <div><span class="text-gold">$</span> <span class="text-foreground/60 animate-pulse">_</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { Linkedin, Mail, MapPin, Send } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { useInViewOnce } from '../../composables/useInViewOnce';

const { target, inView } = useInViewOnce({ rootMargin: '-120px' });

const linkedinUrl = 'https://www.linkedin.com/in/emanuelangelo/';
const toEmail = 'emanuelangelo.dev@gmail.com';

const { t, locale } = useI18n();

const mailSubject = computed(() => {
  void locale.value;
  return t('industrial.contact.mailSubject', { name: form.name || '—' });
});

const sent = ref(false);
const form = reactive({ name: '', email: '', message: '' });

const handleSubmit = () => {
  const subject = encodeURIComponent(mailSubject.value);
  const body = encodeURIComponent(`${t('industrial.contact.mailName')}: ${form.name}\n${t('industrial.contact.mailEmail')}: ${form.email}\n\n${form.message}`);
  window.open(`mailto:${toEmail}?subject=${subject}&body=${body}`, '_blank');

  sent.value = true;
  setTimeout(() => (sent.value = false), 2500);
};
</script>
