<template>
  <div class="todo-list">
    <BasePreloader :show="isLoading" />
    <TheHeader />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    TheHeader,
  },

  setup() {
    const store = useStore();

    const isLoading = computed(function () {
      return store.getters.isLoading;
    });

    return { isLoading };
  },
};
</script>

<style lang="scss"></style>
