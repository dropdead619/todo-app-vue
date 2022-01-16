<template>
  <teleport to="body">
    <BaseBackdrop
      v-if="show"
      @click.self="close" />
    <dialog
      v-if="show"
      :class="`modal modal--${size}`"
      open>
      <header class="p-2 rounded-top bg-dark bg-gradient">
        <slot name="header">
          <span class="text-light fa-2x p-1">{{ title }}</span>
        </slot>
      </header>
      <section class="p-2 text-black">
        <slot></slot>
      </section>
      <menu class="d-flex justify-content-end p-2 m-0">
        <slot name="actions">
          <BaseButton
            class="bg-gradient"
            variant="dark"
            @click="close">
            Close
          </BaseButton>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
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
