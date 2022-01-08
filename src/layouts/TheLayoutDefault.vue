<template>
  <div class="todo-list">
    <TheHeader />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader';

export default {
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss"></style>
