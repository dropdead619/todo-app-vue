<template>
  <BaseDialog
    :show="showLogoutWindow"
    size="medium"
    title="Logout from your account?"
    @close="toggleLogoutWindow">
    <template #actions>
      <BaseButton class="btn-success m-2" @click="logout">
        Yes
      </BaseButton>
      <BaseButton class="btn-danger m-2" @click="toggleLogoutWindow">
        No
      </BaseButton>
    </template>
  </BaseDialog>
  <header class="header sticky-top">
    <nav class="header__nav">
      <RouterLink class="header__nav_link" :to="{ name: 'TasksMain' }"><fa icon="home" /> &nbsp; Main page </RouterLink>
      <RouterLink class="header__nav_link" :to="{ name: 'TasksArchive' }"><fa icon="archive" /> &nbsp; Archived tasks </RouterLink>
      <span
        class="header__nav_link"
        role="button"
        @click="toggleLogoutWindow">
        <fa icon="user" /> &nbsp; Logout
      </span>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const showLogoutWindow = ref(false);

    function toggleLogoutWindow() {
      showLogoutWindow.value = !showLogoutWindow.value;
    }

    function logout() {
      store.dispatch('auth/signout');
      router.replace({ name: 'auth' });
    }

    return { showLogoutWindow, toggleLogoutWindow, logout };
  },
};
</script>

<style scoped lang="scss"></style>
