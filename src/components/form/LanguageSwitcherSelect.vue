<script setup>
const store = useStore();

const lang = computed({
  get() {
    return store.getters['lang/activeLang'];
  },
  set(val) {
    store.dispatch('lang/setLanguage', val);
  },
});
</script>

<template>
  <BaseSelect
    v-model="lang"
    class="lang-select"
    :data="[{ label: 'EN', value: 'en'}, { label: 'RU', value: 'ru'},]"
    optClass="lang-select__option" />
</template>
