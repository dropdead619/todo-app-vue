<template>
  <button
    class="btn btn_scale"
    :class="`btn-${variant}`">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'light',
    },
  },
};
</script>
