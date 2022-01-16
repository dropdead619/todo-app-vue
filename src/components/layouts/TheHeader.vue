<template>
  <BaseDialog
    :show="showLogoutWindow"
    size="tiny"
    :title="translateString('logoutDialog')"
    @close="toggleLogoutWindow">
    <template #actions>
      <BaseButton
        class="bg-gradient m-2"
        variant="dark"
        @click="logout">
        {{ translateString('yes') }}
      </BaseButton>
      <BaseButton
        class="bg-gradient m-2"
        variant="danger"
        @click="toggleLogoutWindow">
        {{ translateString('no') }}
      </BaseButton>
    </template>
  </BaseDialog>
  <aside class="sidebar fixed-top">
    <nav class="sidebar__nav">
      <div class="text-center">
        <LanguageSwitcherSelect class="mb-5" />
        <RouterLink
          class="sidebar__nav_link mb-2"
          :to="{ name: 'TasksMain' }">
          <fa class="mb-1" icon="home" /> {{ translateString('mainPage')}}
        </RouterLink>
        <RouterLink
          class="sidebar__nav_link"
          :to="{ name: 'TasksArchive' }">
          <fa class="mb-1" icon="archive" /> {{ translateString('archivedPage')}}
        </RouterLink>
      </div>
      <span
        class="sidebar__nav_link"
        role="button"
        @click="toggleLogoutWindow">
        <fa class="mb-1" icon="user" /> {{ translateString('logout')}}
      </span>
    </nav>
  </aside>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useTranslator } from '@/composables/translate';
import LanguageSwitcherSelect from '@/components/form/LanguageSwitcherSelect';

export default {
  components: {
    LanguageSwitcherSelect,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const showLogoutWindow = ref(false);

    const { translateString } = useTranslator();

    function toggleLogoutWindow() {
      showLogoutWindow.value = !showLogoutWindow.value;
    }

    function logout() {
      store.dispatch('auth/signout');
      router.replace({ name: 'auth' });
    }

    return { translateString, showLogoutWindow, toggleLogoutWindow, logout };
  },
};
</script>

<style scoped lang="scss"></style>
