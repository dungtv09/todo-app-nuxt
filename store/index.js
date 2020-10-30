import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      todos: [],
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ing3OVNEdmE4UHZvVFpKY1RvQ2hWIiwiaWF0IjoxNjA0MDc5NzIwLCJleHAiOjE2MDQ2ODQ1MjB9.M3efkNemter4dQnWwsY7ThDdWBRfRCOcNW6hLRGyxIs',
    },

    getters: {
      todos(state) {
        return state.todos
      },
      headers(state) {
        return {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
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
      async nuxtServerInit({ commit, state, getters }, context) {
        const data = await context.$axios.$get(
          process.env.baseApiUrl + '/todos',
          getters.headers
        )
        commit('SET_TODOS', data)
      },

      async addTodo({ commit, state, getters }, newTodo) {
        const data = await this.$axios.$post(
          process.env.baseApiUrl + '/todos',
          newTodo,
          getters.headers
        )
        commit('ADD_TODO', data)
      },

      async removeTodo({ commit, state, getters }, id) {
        await this.$axios.$delete(
          process.env.baseApiUrl + '/todos/' + id,
          getters.headers
        )
        commit('REMOVE_TODO', id)
      },
    },
  })
}

export default store
