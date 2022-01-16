
import TRANSLATIONS from '@/locales/translations.json';
import { computed } from 'vue';
import { useStore } from 'vuex';

export function useTranslator() {
  const store = useStore();
  const lang = computed(() => store.getters['lang/activeLang']);

  function translateString(string) {
    return TRANSLATIONS[lang.value][string];
  }

  return { translateString };
}
