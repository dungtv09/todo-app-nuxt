<template>
  <div class="todo-list-page">
    <div class="container">
      <h1>Todo list</h1>
      <form class="form-inline mt-5">
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
          />
        </div>
        <div class="form-group ml-2">
          <button class="btn btn-add-todo" @click.prevent="addTodo">Add</button>
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
              <button class="btn btn-success mb-1" @click="updateStatus(todo)">
                Complete
              </button>
              <button class="btn btn-primary mb-1" @click="editTodo(todo)">
                Edit
              </button>
              <button class="btn btn-warning mb-1" @click="removeTodo(todo)">
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
              <button class="btn btn-success mb-1" @click="updateStatus(todo)">
                Incomplete
              </button>
              <button class="btn btn-primary mb-1" @click="editTodo(todo)">
                Edit
              </button>
              <button class="btn btn-warning mb-1" @click="removeTodo(todo)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',

  async asyncData(context) {
    const data = await context.$axios.$get(
      process.env.baseApiUrl + '/todos',
      context.store.getters.headers
    )
    context.store.dispatch('setTodos', data)
    return { todos: data }
  },

  data() {
    return { newTodoContent: null }
  },

  computed: {
    activeTodos() {
      return this.$store.getters.activeTodos
    },
    completedTodos() {
      return this.$store.getters.completedTodos
    },
  },

  methods: {
    updatedAt(todo) {
      const time = new Date(todo.updated_at)
      return time.toLocaleString()
    },

    addTodo() {
      this.$store.dispatch('addTodo', this.newTodoContent)
      this.newTodoContent = ''
    },

    removeTodo(todo) {
      this.$store.dispatch('removeTodo', todo)
    },

    updateStatus(todo) {
      this.$store.dispatch('updateStatus', todo)
    },

    editTodo(todo) {
      const newContent = prompt('Edit todo', todo.content)
      if (newContent === null) {
        return
      }
      this.$store.dispatch('editTodo', { todo, newContent })
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
