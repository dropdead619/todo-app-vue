<template>
  <div>
    <BaseDialog
      :show="showErrors"
      size="medium"
      :title="loginModeName"
      @close="toggleErrorDialog">
      <div>
        {{ errors }}
      </div>
    </BaseDialog>
  </div>
  <div>
    <div class="title d-flex align-items-center justify-content-center">
      <h1 class="m-4">{{ loginModeName }}</h1>
      <LanguageSwitcherSelect />
    </div>
    <form
      class="form auth-form m-auto "
      @submit.prevent="onSubmit">
      <div class="form-item bg-light">
        <BaseInput
          v-model.trim="user.email"
          class="form-input"
          :label="translateString('email')"
          :placeholder="translateString('email') + '...'" />
      </div>
      <div class="form-item  bg-light">
        <BaseInput
          v-model.trim="user.password"
          class="form-input"
          :label="translateString('password')"
          :placeholder="translateString('password') + '...'"
          type="password" />
      </div>
      <div class="form-item  bg-light">
        <BaseButton variant="dark bg-gradient">{{ loginModeName }}</BaseButton>
        <BaseButton
          type="button"
          variant="outline-secondary bg-gradient"
          @click="toggleMode">
          {{ switchModeButtonText }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>

import { useTranslator } from '@/plugins/i18n';
import LanguageSwitcherSelect from '@/components/form/LanguageSwitcherSelect.vue';

export default {
  name: 'LoginPage',
  components: {
    LanguageSwitcherSelect,
  },
  setup() {
    const loginMode = ref('signIn');
    const showErrors = ref(false);

    const { translateString } = useTranslator();
    const errors = ref('');

    const store = useStore();
    const router = useRouter();

    const user = reactive({
      email: '',
      password: '',
    });

    const loginModeName = computed(() => {
      return loginMode.value === 'signIn' ? translateString('signIn') : translateString('signUp');
    });

    const switchModeButtonText = computed(() => {
      return loginMode.value === 'signIn' ? translateString('noAccount') : translateString('haveAccount');
    });

    function toggleMode() {
      loginMode.value = loginMode.value === 'signIn' ? 'signUp' : 'signIn';
    }

    function toggleErrorDialog() {
      showErrors.value = !showErrors.value;
    }

    function validateForm() {
      errors.value = '';
      if (user.password.length < 6 || user.email === '' || user.password === '') {
        errors.value = 'Incorrect login or password';
        toggleErrorDialog();
      }
    }

    async function onSubmit() {
      validateForm();
      if (errors.value) return;

      try {
        if (loginMode.value === 'signUp') {
          await store.dispatch('auth/signup', user);
        } else {
          await store.dispatch('auth/signin', user);
        }
      } catch (error) {
        errors.value = error;
        toggleErrorDialog();
        return;
      }
      router.push({ name: 'TasksMain' });
    }

    return { user, errors, showErrors, loginModeName, switchModeButtonText, translateString, toggleErrorDialog, onSubmit, toggleMode };
  },
};
</script>
