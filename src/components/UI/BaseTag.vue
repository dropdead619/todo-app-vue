<script setup>

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
