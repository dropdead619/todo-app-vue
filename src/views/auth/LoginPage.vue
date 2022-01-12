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
    </div>
    <form
      class="form m-auto"
      @submit.prevent="onSubmit">
      <div class="form-item">
        <BaseInput
          v-model.trim="user.email"
          class="form-input"
          label="E-mail: "
          placeholder="Your email..." />
      </div>
      <div class="form-item">
        <BaseInput
          v-model.trim="user.password"
          class="form-input"
          label="Password: "
          placeholder="Your password..."
          type="password" />
      </div>
      <div class="form-item">
        <BaseButton variant="success">{{ loginModeName }}</BaseButton>
        <BaseButton
          class="m-auto"
          type="button"
          variant="outline-secondary"
          @click="toggleMode">
          {{ switchModeButtonText }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginPage',
  setup() {
    const loginMode = ref('signIn');
    const showErrors = ref(false);

    const errors = ref('');

    const store = useStore();
    const router = useRouter();

    const user = reactive({
      email: '',
      password: '',
    });

    const loginModeName = computed(function () {
      return loginMode.value === 'signIn' ? 'Sign in' : 'Sign up';
    });

    const switchModeButtonText = computed(function () {
      return loginMode.value === 'signIn' ? 'Don\'t have an account?' : 'Already have an account?';
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

    return { user, errors, showErrors, loginModeName, switchModeButtonText, toggleErrorDialog, onSubmit, toggleMode };
  },
};
</script>
