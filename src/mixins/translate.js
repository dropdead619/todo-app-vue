
import TRANSLATIONS from '@/locales/translations.json';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const lang = computed(() => {
      return store.getters['lang/activeLang'];
    });

    function translateString(string) {
      return TRANSLATIONS[lang.value][string];
    }

    return { translateString };
  },
};
