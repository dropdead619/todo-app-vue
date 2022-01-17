<template>
  <span
    class="badge m-1"
    :class="`bg-${variant}`">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'BaseTag',
  props: {
    variant: {
      type: String,
      default: 'dark',
    },
  },
};
</script>
