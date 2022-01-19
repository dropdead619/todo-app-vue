<template>
  <ul class="tags-list">
    <li v-for="tag in tags" :key="tag.id">
      <TagsItem
        :tag="tag"
        @deleteTag="deleteTag"
        @editTag="editTag" />
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
  setup() {
    const store = useStore();

    function editTag(tag) {
      store.dispatch('tags/editTag', tag).then(() => {
        store.dispatch('tags/fetchTags');
      });
    }

    function deleteTag(id) {
      store.dispatch('tags/deleteTag', { id }).then(() => {
        store.dispatch('tags/fetchTags');
      });
    }

    return { editTag, deleteTag };
  },
};
</script>

<style scoped lang="scss"></style>
