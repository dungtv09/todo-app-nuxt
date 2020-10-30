import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      todos: [],
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ing3OVNEdmE4UHZvVFpKY1RvQ2hWIiwiaWF0IjoxNjA0MDgxNDU0LCJleHAiOjE2MDQ2ODYyNTR9.ORXWfDcQGjJxl_RMlzTpdKK45a4OjzBRRxoGoIb5DKg',
    },

    getters: {
      todos(state) {
        return state.todos
      },
    },

    mutations: {
      SET_TODOS(state, todos) {
        state.todos = todos
      },
      ADD_TODO(state, todo) {
        state.todos.push(todo)
      },
      REMOVE_TODO(state, id) {
        const index = state.todos.findIndex((todo) => todo.id === id)
        state.todos.splice(index, 1)
      },
    },

    actions: {
      async nuxtServerInit({ commit, state }, context) {
        const data = await context.$axios.$get(
          process.env.baseApiUrl + 'todos',
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        )
        commit('SET_TODOS', data)
      },

      async addTodo({ commit, state }, newTodo) {
        await this.$axios.$post(process.env.baseApiUrl + 'todos/', {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          body: newTodo,
        })
      },

      async removeTodo({ commit, state }, id) {
        await this.$axios.$delete(process.env.baseApiUrl + 'todos/' + id, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        commit('REMOVE_TODO', id)
      },
    },
  })
}

export default store
