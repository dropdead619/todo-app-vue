<template>
  <BaseModal
    :show="showTagEditForm && !isLoading"
    @close="toggleTagEditForm">
    <TagsForm
      isEditing
      :tagInfo="tag"
      @submitForm="editTag"
      @toggleForm="toggleTagEditForm" />
  </BaseModal>
  <BaseTag
    class="pointer"
    :variant="tag.variant"
    @click="toggleTagEditForm">
    {{ tag.title }}
  </BaseTag>
</template>

<script>
import TagsForm from '@/components/tags/TagsForm';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default {
  props: {
    tag: {
      type: [Array, Object],
      required: true,
    },
  },
  components: {
    TagsForm,
  },
  emits: ['editTag'],
  setup(_, { emit }) {
    const showTagEditForm = ref(false);
    const store = useStore();
    const isLoading = computed(() => store.getters.isLoading);

    function toggleTagEditForm() {
      showTagEditForm.value = !showTagEditForm.value;
    }

    function editTag(submitedTag) {
      emit('editTag', submitedTag);
    }

    return { showTagEditForm, toggleTagEditForm, editTag, isLoading };
  },
};
</script>

<style scoped lang="scss"></style>
