<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
    <router-link class="navbar-brand" to="/"
      ><img
        src="@/assets/images/logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
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
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="cursor: pointer">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
