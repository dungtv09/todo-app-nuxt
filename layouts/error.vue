<template>
  <div class="error-page">
    <div class="container">
      <h1 v-if="error.statusCode === 404">Page not found (404)</h1>
      <h1 v-else>An error occurred</h1>
      <NuxtLink to="/">Home page</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
.error-page {
  margin-top: 5rem;
}
</style>
