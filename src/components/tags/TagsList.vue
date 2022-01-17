<template>
  <ul class="tags-list">
    <li v-for="tag in tags" :key="tag.id">
      <BaseTag
        class="pointer"
        :variant="tag.variant">
        {{ tag.title }}
      </BaseTag>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    tags: {
      type: [Array, Object],
      required: true,
    },
  },
};
</script>

<style scoped lang="scss"></style>
