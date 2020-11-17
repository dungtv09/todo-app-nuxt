<template>
  <div class="container">
    <div class="card" style="width: 35rem">
      <div class="card-body">
        <h3 class="card-title text-center">Register</h3>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Enter Username"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter Password"
              required
            />
          </div>
          <div class="form-group">
            <label for="re-password">Re-Password</label>
            <input
              id="re-password"
              v-model="rePassword"
              type="password"
              class="form-control"
              placeholder="Enter Password again"
              required
            />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" type="submit">
              Register
            </button>
          </div>
          <div class="text-center">
            <p>
              Already have an account?
              <router-link to="/login"> Login</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      rePassword: null,
    }
  },
  methods: {
    register() {
      if (this.password !== this.rePassword) {
        alert('Password does not match')
      } else {
        this.$store.dispatch('register', {
          username: this.username,
          password: this.password,
        })
      }
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
