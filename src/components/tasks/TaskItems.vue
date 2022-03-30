<script setup>
import TaskForm from '@/components/tasks/TaskForm.vue';
import TagsList from '@/components/tags/TagsList.vue';
import IconBack from '../icons/IconBack.vue';
import IconEdit from '../icons/IconEdit.vue';
import IconDelete from '../icons/IconDelete.vue';
import IconCheck from '../icons/IconCheck.vue';
import IconMinus from '../icons/IconMinus.vue';
import IconArchive from '../icons/IconArchive.vue';

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

const emit = defineEmits(['toggleState', 'deleteTask', 'archiveTask']);

const store = useStore();

const showDropdown = ref(false);
const toggleDropdown = useToggle(showDropdown);
const popup = ref();

onClickOutside(popup, () => {
  showDropdown.value = false;
});

const showEditForm = ref(false);
const toggleEditForm = useToggle(showEditForm);

const showDeleteWindow = ref(false);
const toggleDeleteWindow = useToggle(showDeleteWindow);

const showFullTask = ref(false);
const toggleShowFullTask = useToggle(showFullTask);

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
      <div ref="popup" class="dropdown m-2">
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
              <IconArchive
                v-if="!archived" />
              <IconBack v-else-if="archived" />
            </BaseButton>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <BaseButton
              v-show="!archived"
              class="dropdown-item  bg-gradient"
              variant="dark"
              @click="toggleEditForm">
              <IconEdit />
            </BaseButton>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <BaseButton
              class="dropdown-item bg-gradient"
              variant="dark"
              @click="toggleDeleteWindow">
              <IconDelete />
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
        <IconCheck v-if="task.isDone" />
        <IconMinus v-else icon="minus" />
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
