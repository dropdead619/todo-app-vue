<script setup>
import { useTranslator } from '@/plugins/i18n';

const colorVariants = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
];

const emit = defineEmits(['submitForm', 'toggleForm', 'deleteTag']);

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
  tagInfo: {
    type: [Object, Array],
    default: null,
  },
});

const tag = reactive({
  id: '',
  title: '',
  variant: '',
});

const showErrors = ref(false);

const errors = ref('');

const { translateString } = useTranslator();

const editBtnText = computed(() => {
  return props.isEditing ? translateString('edit') : translateString('add');
});

function selectColor(color) {
  tag.variant = color;
}

function onSubmit() {
  if (tag.title === '') {
    errors.value = translateString('cannotEmptyError');
    toggleErrorDialog();
    return;
  }
  emit('submitForm', {
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
  if (props.isEditing) {
    tag.id = props.tagInfo.id;
    tag.title = props.tagInfo.title;
    tag.variant = props.tagInfo.variant;
    selectColor(tag.variant);
  }
});
</script>

<template>
  <BaseDialog
    :show="showErrors"
    size="medium"
    :title="$translateString('incorrectInput')"
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
        :label="$translateString('tagsTitle')"
        :placeholder="$translateString('inputTitle')" />
    </div>
    <div class="form-item d-flex flex-column align-items-start">
      <label class="form-label h4"> {{$translateString('tagsVariant')}} </label>
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
      <label class="form-label h4 mt-3"> {{ $translateString('selected')}} </label>
      <BaseTag :variant="tag.variant">&nbsp;</BaseTag>
    </div>
    <div class="form-item justify-content-between">
      <BaseButton
        v-if="isEditing"
        class="bg-gradient"
        type="button"
        variant="danger"
        @click="$emit('deleteTag', tag.id)">
        Удалить
      </BaseButton>
      <BaseButton
        v-else
        class="bg-gradient"
        type="button"
        variant="light"
        @click="$emit('toggleForm')">
        {{ $translateString('chooseExisting') }}
      </BaseButton>
      <BaseButton class="bg-gradient" variant="dark"> {{editBtnText}} </BaseButton>
    </div>
  </form>
</template>
