<template>
  <div class="container">
    <div class="card" style="width: 35rem">
      <div class="card-body">
        <h3 class="card-title text-center">Login</h3>
        <form @submit="login">
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
          <div class="form-group form-check">
            <input
              id="exampleCheck1"
              type="checkbox"
              class="form-check-input"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Remember me</label
            >
          </div>
          <div class="form-group">
            <button class="btn btn-success btn-block" type="submit">
              Login
            </button>
          </div>
          <div class="text-center">
            <p>
              Don't have an account.
              <router-link to="/register"> Create an account</router-link>
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
