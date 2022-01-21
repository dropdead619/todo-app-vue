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
  <fa
    v-if="!sideVisible && isMobile"
    class="m-2 position-fixed h3 pointer"
    icon="hamburger"
    style="z-index: 1000"
    @click="toggleSideVisibility" />

  <fa
    v-else-if="sideVisible && isMobile"
    class="m-2 position-fixed h5 pointer"
    icon="times"
    style="z-index: 1000"
    @click="toggleSideVisibility" />
  <aside class="sidebar fixed-top" :class="{'sidebar_visible': sideVisible}">
    <nav class="sidebar__nav">
      <div class="text-center">
        <LanguageSwitcherSelect class="mb-5" />
        <RouterLink
          class="sidebar__nav_link mb-2"
          :to="{ name: 'TasksMain' }">
          <fa class="mb-1" icon="home" /> {{ translateString('mainPage')}}
        </RouterLink>
        <RouterLink
          class="sidebar__nav_link  mb-2"
          :to="{ name: 'TasksArchive' }">
          <fa class="mb-1" icon="archive" /> {{ translateString('archivedPage')}}
        </RouterLink>
      </div>
      <span
        class="sidebar__nav_link logout"
        role="button"
        tabindex="0"
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
import { useIsMobile } from '@/composables/isMobile';
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
    const sideVisible = ref(false);
    const { translateString } = useTranslator();
    const { isMobile } = useIsMobile();

    function toggleLogoutWindow() {
      showLogoutWindow.value = !showLogoutWindow.value;
    }

    function toggleSideVisibility() {
      sideVisible.value = !sideVisible.value;
    }

    function logout() {
      store.dispatch('auth/signout');
      router.replace({ name: 'auth' });
    }

    return { isMobile, sideVisible, translateString, showLogoutWindow, toggleSideVisibility, toggleLogoutWindow, logout };
  },
};
</script>
