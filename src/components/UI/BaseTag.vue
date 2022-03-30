<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  variant: {
    type: String,
    default: 'dark',
  },
});
</script>

<template>
  <span
    class="badge m-1"
    :class="`bg-${props.variant}`">
    <slot></slot>
  </span>
</template>
