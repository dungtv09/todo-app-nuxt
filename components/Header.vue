<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
    <router-link class="navbar-brand" to="/"
      ><img
        src="@/assets/images/logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top mr-1"
        alt="Logo"
      />
      Todo app</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/todos">Todo list</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <span v-if="isLogin" class="navbar-text"
          ><i class="fas fa-user-circle"></i> {{ currentUser }}</span
        >
        <li class="nav-item">
          <router-link v-if="!isLogin" class="nav-link" to="/login"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link v-if="!isLogin" class="nav-link" to="/register"
            >Register</router-link
          >
        </li>
        <li class="nav-item">
          <a
            v-if="isLogin"
            class="nav-link"
            style="cursor: pointer"
            @click="logout"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    currentUser() {
      return this.$store.getters.currentUser
    },
  },
  methods: {
    logout() {
      const c = confirm('Are you sure?')
      if (c !== true) {
        return
      }
      this.$store.dispatch('logout')
    },
  },
}
</script>
