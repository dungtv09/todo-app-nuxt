<template>
  <div class="container">
    <div class="card" style="width: 35rem">
      <div class="card-body">
        <h3 class="card-title text-center">Register</h3>
        <form @submit="register">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              placeholder="Enter Username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="Enter Password"
            />
          </div>
          <div class="form-group">
            <label for="re-password">Re-Password</label>
            <input
              id="re-password"
              type="password"
              class="form-control"
              placeholder="Enter Password again"
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
