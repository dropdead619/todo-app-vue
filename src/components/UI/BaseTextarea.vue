<template>
  <div class="d-flex flex-column w-100">
    <label class="form-label h4"> {{ label }} </label>
    <textarea
      v-bind="$attrs"
      class="textarea w-100"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"></textarea>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BaseTextarea',
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
};
</script>
