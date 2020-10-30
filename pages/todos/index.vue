<template>
  <div class="todo-list-page">
    <div class="container">
      <h1>Todo list</h1>
      <form class="form-inline mt-5" @submit.prevent="addTodo">
        <div class="form-group">
          <label for="new-todo">New todo:</label>
        </div>
        <div class="form-group ml-3">
          <input
            id="new-todo"
            v-model="newTodoContent"
            type="text"
            class="form-control"
            placeholder="Enter new todo"
            autofocus
          />
        </div>
        <div class="form-group ml-2">
          <button type="submit" class="btn btn-add-todo">Add</button>
        </div>
      </form>
      <h5 class="mt-5">Incomplete Todos</h5>
      <table class="table mt-3 table-dark">
        <thead>
          <tr>
            <th scope="col" style="width: 40%">Content</th>
            <th scope="col" style="width: 30%">Last Update</th>
            <th style="width: 30%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in activeTodos" :key="todo.id">
            <td>{{ todo.content }}</td>
            <td>{{ updatedAt(todo) }}</td>
            <td>
              <button class="btn btn-success mb-1">Complete</button>
              <button class="btn btn-primary mb-1">Edit</button>
              <button class="btn btn-warning mb-1" @click="removeTodo(todo.id)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h5 class="mt-5">Completed Todos</h5>
      <table class="table mt-3 table-dark">
        <thead>
          <tr>
            <th scope="col" style="width: 40%">Content</th>
            <th scope="col" style="width: 30%">Completed Time</th>
            <th style="width: 30%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in completedTodos" :key="todo.id">
            <td>
              <del>{{ todo.content }}</del>
            </td>
            <td>
              {{ updatedAt(todo) }}
            </td>
            <td>
              <button class="btn btn-success mb-1">Incomplete</button>
              <button class="btn btn-primary mb-1">Edit</button>
              <button class="btn btn-warning mb-1" @click="removeTodo(todo.id)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <p>{{ activeTodos }}</p>
      <p>{{ completedTodos }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { newTodoContent: null }
  },

  computed: {
    activeTodos() {
      return this.$store.getters.todos.filter(
        (todo) => todo.status === 'active'
      )
    },

    completedTodos() {
      return this.$store.getters.todos.filter(
        (todo) => todo.status === 'completed'
      )
    },
  },

  methods: {
    updatedAt(todo) {
      const time = new Date(todo.updated_at)
      return time.toLocaleString()
    },

    addTodo() {
      this.$store.dispatch('addTodo', { content: this.newTodoContent })
    },

    removeTodo(id) {
      this.$store.dispatch('removeTodo', id)
    },
  },
}
</script>

<style scoped>
.todo-list-page {
  margin-top: 5rem;
}
.todo-list-page h1 {
  color: #e01d18;
}
.btn-add-todo {
  color: #fff;
  background-color: #e74a1b;
}
</style>
