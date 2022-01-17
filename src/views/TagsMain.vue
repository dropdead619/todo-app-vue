<template>
  <BaseModal
    :show="showTagAddForm && !isLoading"
    @close="toggleTagAddForm">
    <TagsForm
      @submitForm="addTag"
      @toggleForm="toggleTagAddForm" />
  </BaseModal>
  <div class="tags">
    <div class="title d-flex align-items-center justify-content-center">
      <h1 class="m-4">{{ translateString('tagsPage') }} </h1>
      <BaseButton @click="toggleTagAddForm"> <fa icon="tags" /> Add new</BaseButton>
    </div>
    <div>
      <TagsList :tags="tags" />
    </div>
    <div class=" d-flex flex-column align-items-center justify-content-center">
      <TagsMultiselect
        v-model:value="selectedTags"
        label="Select tasks"
        :tags="tags" />
      <div>
        <label class="mt-4">{{ 'Selected tags:' }} </label>
        <TagsList :tags="selectedTags" />
      </div>

      <BaseButton
        class="mt-4"
        @click="updateTask">
        Update task
      </BaseButton>
    </div>
  </div>
</template>

<script>
import TagsList from '@/components/tags/TagsList';
import TagsForm from '@/components/tags/TagsForm';
import TagsMultiselect from '@/components/form/TagsMultiselect';
import { useStore } from 'vuex';
import { useTranslator } from '@/composables/translate';
import { useRouter, useRoute } from 'vue-router';

import { ref, computed, onBeforeMount } from 'vue';

export default {
  name: 'TagsMain',
  components: {
    TagsList,
    TagsForm,
    TagsMultiselect,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const { translateString } = useTranslator();

    const showTagAddForm = ref(false);

    const selectedTags = ref([]);

    const tags = computed(() => store.getters['tags/tags']);

    const isLoading = computed(() => store.getters.isLoading);

    const archivedTasks = computed(() => store.getters['tasks/archived']);

    function addTag(tag) {
      store.dispatch('tags/addTag', tag).then(() => {
        toggleTagAddForm();
        store.dispatch('tags/fetchTags');
      });
    }

    function updateTask() {
      store.dispatch('tasks/editTask', {
        id: route.query.taskId,
        tags: selectedTags.value,
      }).then(() => {
        router.push({ name: 'TasksMain' });
      });
    }

    function toggleTagAddForm() {
      showTagAddForm.value = !showTagAddForm.value;
    }

    onBeforeMount(function () {
      store.dispatch('tags/fetchTags');
    });

    return { selectedTags, tags, showTagAddForm, isLoading, archivedTasks, translateString, addTag, updateTask, toggleTagAddForm };
  },
};
</script>

<style scoped lang="scss"></style>
