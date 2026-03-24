import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useInViewOnce(options = {}) {
  const target = ref(null);
  const inView = ref(false);

  const rootMargin = options.rootMargin ?? '-100px';
  const threshold = options.threshold ?? 0.15;

  let observer;

  onMounted(() => {
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
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = undefined;
  });

  return { target, inView };
}
