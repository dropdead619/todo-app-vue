<template>
  <BaseSelect
    v-model="lang"
    class="text-white"
    :data="[{ label: 'EN', value: 'en'}, { label: 'RU', value: 'ru'},]"
    optClass="bg-dark" />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const lang = computed({
      get() {
        return store.getters['lang/activeLang'];
      },
      set(val) {
        store.dispatch('lang/setLanguage', val);
      },
    });

    return { lang };
  },
};
</script>
