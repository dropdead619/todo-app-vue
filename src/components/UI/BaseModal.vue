<template>
  <teleport to="body">
    <BaseBackdrop
      v-if="show"
      @click.self="close" />
    <transition name="fade">
      <div
        v-if="show"
        :class="`modal modal--${size}`">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  emits: ['close'],
  setup(_, { emit }) {
    function close() {
      emit('close');
    }

    return { close };
  },
};
</script>
