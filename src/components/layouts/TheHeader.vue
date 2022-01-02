<template>
  <header class="header sticky-top">
    <nav class="header__nav">
      <router-link :to="{ name: 'TasksMain' }"><fa icon="home" /> &nbsp; Main page </router-link>
      <router-link :to="{ name: 'UserProfile' }"><fa icon="user" /> &nbsp; My profile </router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="scss"></style>
