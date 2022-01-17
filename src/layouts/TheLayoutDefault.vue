<template>
  <BasePreloader :show="isLoading" />

  <TheSider />
  <div>
    <router-view />
  </div>
</template>

<script>
import TheSider from '@/components/layouts/TheSider';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    TheSider,
  },

  setup() {
    const store = useStore();

    const isLoading = computed(() => store.getters.isLoading);

    return { isLoading };
  },
};
</script>

<style lang="scss"></style>
