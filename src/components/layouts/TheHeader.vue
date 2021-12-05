<template>
  <header class="header">
    <nav class="header__nav">
      <router-link :to="{ name: 'TaskList' }"><fa icon="home" /> &nbsp; Main page </router-link>
      <router-link :to="{ name: 'TaskAdd' }"><fa icon="plus" />  &nbsp; Add new task </router-link>
      <router-link :to="{ name: 'UserProfile' }"><fa icon="user" /> &nbsp; My profile </router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="scss"></style>
