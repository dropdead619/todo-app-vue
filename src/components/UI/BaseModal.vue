<script setup>
// eslint-disable-next-line no-undef
const emit = defineEmits(['close']);

// eslint-disable-next-line no-undef
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
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
  <teleport to="body">
    <BaseBackdrop
      v-if="props.show"
      @click.self="close" />
    <transition name="fade">
      <div
        v-if="props.show"
        :class="`modal modal--${props.size}`">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>
