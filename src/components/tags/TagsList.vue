<template>
  <ul class="tags-list">
    <li v-for="tag in tags" :key="tag.id">
      <TagsItem :tag="tag" @editTag="editTag" />
    </li>
  </ul>
</template>

<script>
import TagsItem from '@/components/tags/TagsItem';
import { useStore } from 'vuex';

export default {
  props: {
    tags: {
      type: [Array, Object],
      required: true,
    },
  },
  components: {
    TagsItem,
  },
  emits: ['editTag'],
  setup() {
    const store = useStore();

    function editTag(tag) {
      store.dispatch('tags/editTag', tag).then(() => {
        store.dispatch('tags/fetchTags');
      });
    }

    return { editTag };
  },
};
</script>

<style scoped lang="scss"></style>
