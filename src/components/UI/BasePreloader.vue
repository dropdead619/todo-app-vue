<template>
  <teleport to="body">
    <BaseBackdrop v-if="show">
      <img
        alt="preloader"
        class="preloader"
        src="@/assets/spinner_preload.svg">
    </BaseBackdrop>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.preloader {
  position: relative;
  width: 80px;
  height: 80px;
  left: 50%;
  top: 50%;
  margin-top: -80px;
}

</style>
