<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <teleport to="body">
    <BaseBackdrop v-if="props.show">
      <img
        alt="preloader"
        class="preloader"
        src="@/assets/spinner_preload.svg">
    </BaseBackdrop>
  </teleport>
</template>

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
