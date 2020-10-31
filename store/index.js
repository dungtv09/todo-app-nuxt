import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      todos: [],
      token: null,
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
      activeTodos(state) {
        return state.todos.filter((todo) => todo.status === 'active')
      },
      completedTodos(state) {
        return state.todos.filter((todo) => todo.status === 'completed')
      },
      isLogin(state) {
        return state.token !== null
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
      EDIT_TODO(state, payload) {
        state.todos.find((item) => item.id === payload.todo.id).content =
          payload.newContent
      },
      SET_TOKEN(state, token) {
        state.token = token
      },
      CLEAR_TOKEN(state) {
        state.token = null
      },
    },

    actions: {
      setTodos({ commit }, data) {
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

      async removeTodo({ commit, state, getters }, todo) {
        await this.$axios.$delete(
          process.env.baseApiUrl + '/todos/' + todo.id,
          getters.headers
        )
        commit('REMOVE_TODO', todo.id)
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

      editTodo({ commit, getters }, payload) {
        // await this.$axios.$put(
        //   process.env.baseApiUrl + '/todos/' + payload.todo.id,
        //   {
        //     content: payload.newContent,
        //   },
        //   getters.headers
        // )
        commit('EDIT_TODO', payload)
      },

      async register({ getters }, user) {
        try {
          await this.$axios.$post(
            process.env.baseApiUrl + '/auth/register',
            user,
            getters.headers
          )
          this.$router.push('/login')
        } catch (err) {
          alert(err.response.data.message)
        }
      },

      async login({ commit, getters }, user) {
        try {
          const data = await this.$axios.$post(
            process.env.baseApiUrl + '/auth/login',
            user,
            getters.headers
          )
          commit('SET_TOKEN', data.token)
          this.$router.push('/todos')
        } catch (err) {
          alert(err.response.data.message)
        }
      },

      logout({ commit }) {
        commit('CLEAR_TOKEN')
        this.$router.push('/')
      },
    },
  })
}

export default store
