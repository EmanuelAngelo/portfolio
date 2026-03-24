import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useInViewOnce(options = {}) {
  const target = ref(null);
  const inView = ref(false);

  const rootMargin = options.rootMargin ?? '-100px';
  const threshold = options.threshold ?? 0.15;

  let observer;
  let safetyTimer;

  onMounted(() => {
    safetyTimer = window.setTimeout(() => {
      if (!inView.value) inView.value = true;
      observer?.disconnect();
      observer = undefined;
    }, options.timeoutMs ?? 1500);

    if (typeof window === 'undefined') {
      inView.value = true;
      return;
    }

    if (!('IntersectionObserver' in window)) {
      inView.value = true;
      return;
    }

    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (entry.isIntersecting) {
            inView.value = true;
            observer?.disconnect();
          }
        },
        { root: null, rootMargin, threshold }
      );

      if (target.value) observer.observe(target.value);
      else inView.value = true;
    } catch {
      inView.value = true;
    }
  });

  onBeforeUnmount(() => {
    if (safetyTimer) window.clearTimeout(safetyTimer);
    observer?.disconnect();
    observer = undefined;
  });

  return { target, inView };
}
