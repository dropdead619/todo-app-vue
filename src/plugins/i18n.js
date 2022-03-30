import TRANSLATIONS from '@/locales/translations.json';

export default {
  install: (app, options) => {
    const { translateString } = useTranslator();
    app.config.globalProperties.$translateString = translateString;
  },
};

export function useTranslator() {
  const translateString = (string, count = 0) => {
    const store = useStore();
    const lang = computed(() => store.getters['lang/activeLang']);
    const arrCount = count.toString().split();
    const lastNum = +arrCount[arrCount.length - 1];
    if (Array.isArray(TRANSLATIONS[lang.value][string])) {
      if (lang.value === 'ru') {
        if (lastNum === 1) {
          return TRANSLATIONS[lang.value][string][1];
        } else if (lastNum <= 4 && lastNum >= 2) {
          return TRANSLATIONS[lang.value][string][2];
        } else {
          return TRANSLATIONS[lang.value][string][0];
        }
      } else if (lang.value === 'en') {
        if (lastNum === 1) {
          return TRANSLATIONS[lang.value][string][1];
        } else {
          return TRANSLATIONS[lang.value][string][0];
        }
      }
    }

    return TRANSLATIONS[lang.value][string];
  };

  return { translateString };
}
