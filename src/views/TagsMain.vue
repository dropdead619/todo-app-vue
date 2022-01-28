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
      <h1 class="m-4">{{ translateString('tagsPage', 2) }} </h1>
      <BaseButton @click="toggleTagAddForm"> <fa icon="tags" /> {{ translateString('add') }}</BaseButton>
    </div>
    <div>
      <TagsList v-if="tags" :tags="tags" />
    </div>
    <div
      v-if="tags"
      class=" d-flex flex-column align-items-center justify-content-center">
      <label class="m-4"> {{ translateString('selectTags') }}</label>
      <select
        v-model="selectedTags"
        class="custom-multiselect bg-dark"
        multiple>
        <option
          v-for="tag in tags"
          :key="tag.id"
          class="badge"
          :class="`bg-${tag.variant}`"
          :value="tag">
          {{ tag.title }}
        </option>
      </select>
      <div class="mt-4 d-flex justify-content-start align-items-center">
        <label class="mx-2"> {{ translateString('selected') }} </label>
        <TagsList :tags="selectedTags" />
      </div>
      <BaseButton
        class="mt-4"
        @click="updateTask">
        {{ translateString('updateTask') }}
      </BaseButton>
    </div>
    <template v-else>
      <div class="d-flex align-items-center justify-content-center text-warning">{{ translateString('nothingToDisplay') }}</div>
    </template>
  </div>
</template>

<script>
import TagsList from '@/components/tags/TagsList';
import TagsForm from '@/components/tags/TagsForm';
import { useStore } from 'vuex';
import { useTranslator } from '@/composables/translate';
import { useRouter, useRoute } from 'vue-router';

import { ref, computed, onMounted } from 'vue';

export default {
  name: 'TagsMain',
  components: {
    TagsList,
    TagsForm,
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

    onMounted(function () {
      store.dispatch('tags/fetchTags');
    });

    return { selectedTags, tags, showTagAddForm, isLoading, archivedTasks, translateString, addTag, updateTask, toggleTagAddForm };
  },
};
</script>
