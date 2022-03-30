<script setup>

import TaskForm from '@/components/tasks/TaskForm.vue';
import TagsList from '@/components/tags/TagsList.vue';

// eslint-disable-next-line no-undef
const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: () => {},
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(['toggleState', 'deleteTask', 'archiveTask']);

const store = useStore();

const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

const showDeleteWindow = ref(false);

const showEditForm = ref(false);

function toggleEditForm() {
  showEditForm.value = !showEditForm.value;
}

function toggleDeleteWindow() {
  showDeleteWindow.value = !showDeleteWindow.value;
}

const showFullTask = ref(false);

function toggleShowFullTask() {
  showFullTask.value = !showFullTask.value;
}

function archiveTask() {
  emit('archiveTask', props.task);
}

function toggleState() {
  emit('toggleState', props.task);
}

function deleteTask() {
  emit('deleteTask', props.task.id);
}

function editTask(task) {
  store.dispatch('tasks/editTask', task).then(() => {
    store.dispatch('tasks/fetchTasks');
  }).then(() =>
    toggleEditForm());
}
</script>

<template>
  <div>
    <BaseDialog
      :show="showDeleteWindow"
      size="small"
      :title="$translateString('deleteTaskModal')"
      @close="toggleDeleteWindow">
      <template #actions>
        <BaseButton
          class="m-2 bg-gradient"
          variant="dark"
          @click="deleteTask">
          {{ $translateString('yes')}}
        </BaseButton>
        <BaseButton
          class="m-2 bg-gradient"
          variant="danger"
          @click="toggleDeleteWindow">
          {{ $translateString('no')}}
        </BaseButton>
      </template>
    </BaseDialog>
    <BaseModal
      :show="showEditForm"
      @close="toggleEditForm">
      <TaskForm
        :id="task.id"
        isEditing
        @submitForm="editTask" />
    </BaseModal>
  </div>
  <div
    class="d-flex flex-column justify-content-evenly">
    <div class="d-flex align-items-center justify-content-between rounded-top bg-gradient bg-black">
      <div class="text-white m-3"> {{ $dayjs(task.createdAt).format('HH:mm DD.MM.YYYY') }}</div>
      <div class="dropdown m-2">
        <BaseButton
          class="btn dropdown-toggle"
          @click="toggleDropdown" />
        <ul
          id="dropdownMenu2"
          class="dropdown-menu actions-dropdown"
          :class="{ 'show': showDropdown }">
          <li>
            <BaseButton
              class="dropdown-item bg-gradient"
              variant="dark"
              @click="archiveTask">
              <fa
                v-if="!archived"
                icon="archive" />
              <fa v-else-if="archived" icon="arrow-left" />
            </BaseButton>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <BaseButton
              v-show="!archived"
              class="dropdown-item  bg-gradient"
              variant="dark"
              @click="toggleEditForm">
              <fa icon="pen" />
            </BaseButton>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <BaseButton
              class="dropdown-item bg-gradient"
              variant="dark"
              @click="toggleDeleteWindow">
              <fa icon="minus" />
            </BaseButton>
          </li>
        </ul>
      </div>
    </div>

    <BaseCard @click="toggleShowFullTask">
      <BaseCheckbox
        :checked="task.isDone"
        :disabled="archived"
        @toggle="toggleState">
        <fa v-if="task.isDone" icon="check" />
        <fa v-else icon="minus" />
      </BaseCheckbox>
      <div class="card-body w-75">
        <h5 class="card-title">{{ task.title }}</h5>
        <p
          v-if="!showFullTask"
          class="card-text text-truncate">
          {{task.description}}
        </p>
        <p
          v-else
          class="card-text "
          style="white-space: pre-wrap;">
          {{task.description}}
        </p>
      </div>
    </BaseCard>
    <div v-if="task.tags" class="bg-dark bg-gradient rounded-bottom">
      <TagsList class="flex-row-reverse" :tags="task.tags" />
    </div>
  </div>
</template>
