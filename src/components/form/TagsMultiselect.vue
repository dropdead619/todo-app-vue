<template>
  <label class="m-4"> {{ label }} </label>
  <select
    v-bind="$attrs"
    class="custom-multiselect bg-dark"
    multiple
    @input="$emit('update:modelValue', $event.target.value)">
    <option
      v-for="tag in tags"
      :key="tag.id"
      class="badge"
      :class="`bg-${tag.variant}`"
      :value="tag">
      {{ tag.title }}
    </option>
  </select>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    tags: {
      type: [Array, Object],
      required: true,
    },
    modelValue: {
      type: [Object, Array],
      required: true,
    },
  },
  emits: ['update:modelValue'],
};
</script>
