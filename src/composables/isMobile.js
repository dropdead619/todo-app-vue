import { computed, reactive } from 'vue';
import { MOBILE_BREAKPOINT } from '@/config/constants';

export function useIsMobile() {
  const app = reactive({
    width: window.innerWidth,
  });

  const isMobile = computed(() => app.width < MOBILE_BREAKPOINT);

  function resizeHandler() {
    app.width = window.innerWidth;
  }

  window.addEventListener('resize', resizeHandler);

  return { isMobile };
}
