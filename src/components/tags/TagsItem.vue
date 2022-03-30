<script setup>
import TagsForm from '@/components/tags/TagsForm.vue';

const props = defineProps({
  tag: {
    type: [Array, Object],
    required: true,
  },
});

const emit = defineEmits(['editTag', 'deleteTag']);
const showTagEditForm = ref(false);
const store = useStore();
const isLoading = computed(() => store.getters.isLoading);

const toggleTagEditForm = useToggle(showTagEditForm);

function editTag(submitedTag) {
  emit('editTag', submitedTag);
}

function deleteTag(tagId) {
  emit('deleteTag', tagId);
}
</script>

<template>
  <BaseModal
    :show="showTagEditForm && !isLoading"
    @close="toggleTagEditForm">
    <TagsForm
      isEditing
      :tagInfo="props.tag"
      @deleteTag="deleteTag"
      @submitForm="editTag"
      @toggleForm="toggleTagEditForm" />
  </BaseModal>
  <BaseTag
    class="pointer bg-gradient"
    tabindex="0"
    :variant="props.tag.variant"
    @click="toggleTagEditForm"
    @keyup.enter="toggleTagEditForm">
    {{ props.tag.title }}
  </BaseTag>
</template>
