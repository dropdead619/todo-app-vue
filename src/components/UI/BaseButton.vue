<template>
  <button
    class="btn btn-white btn--scale m-2"
    @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  emits: ['click'],
  setup(_, { emit }) {
    function onClick() {
      emit('click');
    }

    return { onClick };
  },
};
</script>
