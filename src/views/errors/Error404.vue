<template>
  <BaseCard class="m-auto p-3 mt-5 d-flex flex-column text-center w-50">
    <h1 class="p-3 display-1">Error 404</h1>
    <RouterLink :to="{ name: 'default' }"> To main page </RouterLink>
  </BaseCard>
</template>

<script>
export default {
  name: 'Error404',
  setup() {},
};
</script>
