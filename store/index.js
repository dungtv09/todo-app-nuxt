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
      activeTodos(state) {
        return state.todos.filter((todo) => todo.status === 'active')
      },
      completedTodos(state) {
        return state.todos.filter((todo) => todo.status === 'completed')
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
      UPDATE_STATUS(state, todo) {
        const todoTemp = state.todos.find((item) => item.id === todo.id).status
        state.todos.find((item) => item.id === todo.id).status =
          todoTemp === 'active' ? 'completed' : 'active'
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

      async addTodo({ commit, state, getters }, newTodoContent) {
        const data = await this.$axios.$post(
          process.env.baseApiUrl + '/todos',
          { content: newTodoContent },
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

      async updateStatus({ commit, getters }, todo) {
        if (todo.status === 'active') {
          await this.$axios.$put(
            process.env.baseApiUrl + '/todos/' + todo.id,
            {
              status: 'completed',
            },
            getters.headers
          )
        } else {
          await this.$axios.$put(
            process.env.baseApiUrl + '/todos/' + todo.id,
            {
              status: 'active',
            },
            getters.headers
          )
        }
        commit('UPDATE_STATUS', todo)
      },
    },
  })
}

export default store
