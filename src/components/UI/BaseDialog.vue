<script setup>

const emit = defineEmits(['close']);

const props = defineProps({
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
});

function close() {
  emit('close');
}
</script>

<template>
  <teleport
    to="body">
    <BaseBackdrop
      v-if="props.show"
      @click.self="close" />
    <transition name="fade">
      <dialog
        v-if="props.show"
        :class="`modal modal--${props.size}`"
        open>
        <header class="p-2 rounded-top bg-dark bg-gradient">
          <slot name="header">
            <span class="text-light fa-2x p-1">{{ props.title }}</span>
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
    </transition>
  </teleport>
</template>
