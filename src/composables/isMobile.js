import { computed, reactive } from 'vue';

export function useIsMobile() {
  const app = reactive({
    width: window.innerWidth,
  });

  const isMobile = computed(() => app.width < 850);

  function resizeHandler() {
    app.width = window.innerWidth;
  }

  window.addEventListener('resize', resizeHandler);

  return { isMobile };
}
