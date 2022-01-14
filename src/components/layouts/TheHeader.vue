<template>
  <BaseDialog
    :show="showLogoutWindow"
    size="tiny"
    title="Logout from your account?"
    @close="toggleLogoutWindow">
    <template #actions>
      <BaseButton
        class="success m-2"
        variant="success"
        @click="logout">
        Yes
      </BaseButton>
      <BaseButton
        class="danger m-2"
        variant="danger"
        @click="toggleLogoutWindow">
        No
      </BaseButton>
    </template>
  </BaseDialog>
  <header class="header fixed-top">
    <nav class="header__nav">
      <div>
        <RouterLink
          class="header__nav_link mb-2"
          tabindex="0"
          :to="{ name: 'TasksMain' }">
          <fa class="mb-1" icon="home" /> Main
        </RouterLink>
        <RouterLink
          class="header__nav_link"
          tabindex="0"
          :to="{ name: 'TasksArchive' }">
          <fa class="mb-1" icon="archive" /> Archived
        </RouterLink>
      </div>
      <span
        class="header__nav_link"
        role="button"
        tabindex="0"
        @click="toggleLogoutWindow">
        <fa class="mb-1" icon="user" /> Logout
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
