<template>
  <BaseDialog
    :show="showErrors"
    size="medium"
    :title="translateString('incorrectInput')"
    @close="toggleErrorDialog">
    <div>
      {{ errors }}
    </div>
  </BaseDialog>
  <form
    class="form"
    @submit.prevent="onSubmit">
    <div class="form-item d-flex align-items-center">
      <BaseInput
        v-model="tag.title"
        class="form-input"
        :label="translateString('tagsTitle')"
        :placeholder="translateString('inputTitle')" />
    </div>
    <div class="form-item d-flex flex-column align-items-start">
      <label class="form-label h4"> Tag color: </label>
      <div>
        <BaseTag
          v-for="variant in colorVariants"
          :key="variant"
          class="pointer"
          :variant="variant"
          @click="selectColor(variant)">
         &nbsp;
        </BaseTag>
      </div>

      <BaseTag :variant="tag.variant">&nbsp;</BaseTag>
    </div>
    <div class="form-item justify-content-between">
      <BaseButton
        class="bg-gradient"
        type="button"
        variant="light"
        @click="$emit('toggleForm')">
        Choose from existing
      </BaseButton>
      <BaseButton class="bg-gradient" variant="dark"> Add tag </BaseButton>
    </div>
  </form>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed, onMounted } from 'vue';
import { useTranslator } from '@/composables/translate';

const colorVariants = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
];

export default {
  name: 'TagsForm',
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  emits: ['submitForm', 'toggleForm'],
  setup(props, context) {
    const tag = reactive({
      id: '',
      title: '',
      variant: '',
    });

    const { translateString } = useTranslator();

    const showErrors = ref(false);

    const errors = ref('');

    const showInput = ref(false);

    const store = useStore();

    const isLoading = computed(() => store.getters.isLoading);

    function selectColor(color) {
      tag.variant = color;
    }

    function onSubmit() {
      if (tag.title === '') {
        errors.value = translateString('cannotEmptyError');
        toggleErrorDialog();
        return;
      }
      context.emit('submitForm', {
        id: props.isEditing ? tag.id : '',
        title: tag.title,
        variant: tag.variant,
      });
      if (!props.isEditing) {
        tag.title = '';
        tag.variant = '';
      }
    }

    function toggleErrorDialog() {
      showErrors.value = !showErrors.value;
    }

    onMounted(() => {
    //   if (props.isEditing) {
    //     store.dispatch('tasks/fetchTaskById', props.id).then((res) => {
    //       tag.id = res.id;
    //       tag.title = res.title;
    //       tag.variant = res.variant;
    //     });
    //   }
    });

    return { showErrors, colorVariants, errors, tag, showInput, isLoading, translateString, onSubmit, toggleErrorDialog, selectColor };
  },
};
</script>
