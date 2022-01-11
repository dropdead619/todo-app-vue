<template>
  <label class="form-label"> {{ label }} </label>
  <textarea
    v-bind="$attrs"
    class="textarea"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"></textarea>
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
