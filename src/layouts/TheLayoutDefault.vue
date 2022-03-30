
<script setup>
const store = useStore();

const isLoading = computed(() => store.getters.isLoading);
</script>

<template>
  <BasePreloader :show="isLoading" />
  <TheSider />

  <div>
    <router-view />
  </div>
</template>
