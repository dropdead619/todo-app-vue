<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: #262626;
  color: white;
  max-width: 20rem;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem;
}
</style>
