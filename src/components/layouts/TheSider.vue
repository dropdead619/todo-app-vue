<template>
  <BaseDialog
    :show="showLogoutWindow"
    size="tiny"
    :title="$translateString('logoutDialog')"
    @close="toggleLogoutWindow">
    <template #actions>
      <BaseButton
        class="bg-gradient m-2"
        variant="dark"
        @click="logout">
        {{ $translateString('yes') }}
      </BaseButton>
      <BaseButton
        class="bg-gradient m-2"
        variant="danger"
        @click="toggleLogoutWindow">
        {{ $translateString('no') }}
      </BaseButton>
    </template>
  </BaseDialog>
  <fa
    v-if="!sideVisible && isMobile"
    class="m-2 position-fixed h3 pointer"
    icon="hamburger"
    style="z-index: 1000"
    tabindex="1"
    @click="toggleSideVisibility"
    @keyup.enter.exact="toggleSideVisibility" />

  <fa
    v-else-if="sideVisible && isMobile"
    class="m-2 position-fixed h5 pointer"
    icon="times"
    style="z-index: 1000"
    tabindex="1"
    @click="toggleSideVisibility"
    @keyup.enter.exact="toggleSideVisibility" />

  <aside class="sidebar fixed-top" :class="{'sidebar_visible': sideVisible}">
    <nav class="sidebar__nav">
      <div class="text-center">
        <LanguageSwitcherSelect class="mb-3" />
        <BaseButton
          class="mb-3"
          :variant="isDark ? 'light' : 'dark'"
          @click="toggleDark()">
          <IconMoon v-if="isDark" />
          <IconSun v-else />
        </BaseButton>
        <RouterLink
          class="sidebar__nav_link mb-2"
          :to="{ name: 'TasksMain' }">
          <fa class="mb-1" icon="home" /> {{ $translateString('mainPage')}}
        </RouterLink>
        <RouterLink
          class="sidebar__nav_link  mb-2"
          :to="{ name: 'TasksArchive' }">
          <fa class="mb-1" icon="archive" /> {{ $translateString('archivedPage')}}
        </RouterLink>
      </div>
      <span
        class="sidebar__nav_link logout"
        role="button"
        tabindex="0"
        @click="toggleLogoutWindow">
        <fa class="mb-1" icon="user" /> {{ $translateString('logout')}}
      </span>
    </nav>
  </aside>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useDark, useToggle, useMediaQuery } from '@vueuse/core';
import IconMoon from '@/components/icons/IconMoon';
import IconSun from '@/components/icons/IconSun';
import LanguageSwitcherSelect from '@/components/form/LanguageSwitcherSelect';

export default {
  components: {
    LanguageSwitcherSelect,
    IconMoon,
    IconSun,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const showLogoutWindow = ref(false);
    const sideVisible = ref(false);
    const isMobile = useMediaQuery('(max-width: 850px)');

    const isDark = useDark({
      selector: 'body',
      attribute: 'class',
      valueDark: 'dark',
      valueLight: 'light',
    });
    const toggleDark = useToggle(isDark);

    watch(isDark, (val) => {
      store.commit('TOGGLE_APP_THEME', val, { root: true });
    });

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

    return { isMobile, sideVisible, showLogoutWindow, toggleSideVisibility, toggleLogoutWindow, logout, toggleDark, isDark };
  },
};
</script>
