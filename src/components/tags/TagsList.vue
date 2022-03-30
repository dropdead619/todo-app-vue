<script setup>
import TagsItem from '@/components/tags/TagsItem.vue';

// eslint-disable-next-line no-undef
const props = defineProps({
  tags: {
    type: [Array, Object],
    required: true,
  },
});
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
</script>

<template>
  <ul class="tags-list">
    <li v-for="tag in props.tags" :key="tag.id">
      <TagsItem
        :tag="tag"
        @deleteTag="deleteTag"
        @editTag="editTag" />
    </li>
  </ul>
</template>
