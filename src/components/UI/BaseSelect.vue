<template>
  <select
    v-bind="$attrs"
    class="select"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)">
    <option
      v-for="option in data"
      :key="option.value"
      :class="$attrs.optClass"
      :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
};
</script>
