<template>
  <div>
    <div class="title d-flex align-items-center justify-content-center">
      <h1 class="m-4">Sign in</h1>
    </div>

    <form
      class="form m-auto"
      @submit.prevent="onSubmit">
      <div class="form-item">
        <BaseInput
          class="form-input"
          label="Username: "
          placeholder="Your username..."
          required />
      </div>
      <div class="form-item">
        <BaseInput
          class="form-input"
          label="Password: "
          placeholder="Your password..."
          required
          type="password" />
      </div>
      <div class="form-item">
        <div>
          <input
            id="rememberPass"
            type="checkbox">
          <label class="text-black m-2" for="rememberPass">Remember me</label>
        </div>
      </div>
      <div class="form-item">
        <BaseButton class="m-auto">Don't have an account?</BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  setup() {
    function onSubmit() {

    }

    return { onSubmit };
  },
};
</script>
