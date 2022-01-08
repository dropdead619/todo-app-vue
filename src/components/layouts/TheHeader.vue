<template>
  <header class="header sticky-top">
    <nav class="header__nav">
      <RouterLink class="header__nav_link" :to="{ name: 'TasksMain' }"><fa icon="home" /> &nbsp; Main page </RouterLink>
      <RouterLink class="header__nav_link" :to="{ name: 'TasksArchive' }"><fa icon="archive" /> &nbsp; Archived tasks </RouterLink>
      <RouterLink class="header__nav_link" :to="{ name: 'UserProfile' }"><fa icon="user" /> &nbsp; My profile </RouterLink>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="scss"></style>
