<template>
  <button
    class="btn btn_scale"
    :class="`btn-${props.variant}`">
    <slot></slot>
  </button>
</template>

<script setup>

const props = defineProps({
  variant: {
    type: String,
    default: 'light',
  },
});
</script>
