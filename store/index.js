import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      todos: [],
      token: null,
      currentUser: null,
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
      currentUser(state) {
        return state.currentUser
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
        state.todos.find((item) => item.id === todo.id).updated_at = Date.now()
      },
      EDIT_TODO(state, payload) {
        state.todos.find((item) => item.id === payload.todo.id).content =
          payload.newContent
        state.todos.find(
          (item) => item.id === payload.todo.id
        ).updated_at = Date.now()
      },
      SET_TOKEN(state, token) {
        state.token = token
      },
      CLEAR_TOKEN(state) {
        state.token = null
      },
      SET_CURRENT_USER(state, username) {
        state.currentUser = username
      },
    },

    actions: {
      nuxtServerInit({ commit }, { req }) {
        if (!req.headers.cookie) return false
        const tokenKey = req.headers.cookie
          .split(';')
          .find((i) => i.trim().startsWith('token='))
        const usernameKey = req.headers.cookie
          .split(';')
          .find((i) => i.trim().startsWith('username='))

        if (!tokenKey || !usernameKey) return false
        const token = tokenKey.split('=')[1]
        const username = usernameKey.split('=')[1]

        commit('SET_TOKEN', token)
        commit('SET_CURRENT_USER', username)
      },

      setTodos({ commit }, data) {
        commit('SET_TODOS', data)
      },

      async addTodo({ commit, getters }, newTodoContent) {
        const data = await this.$axios.$post(
          process.env.baseApiUrl + '/todos',
          { content: newTodoContent },
          getters.headers
        )
        commit('ADD_TODO', data)
      },

      async removeTodo({ commit, getters }, todo) {
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
            user
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
            user
          )

          commit('SET_TOKEN', data.token)
          this.$cookies.set('token', data.token)

          commit('SET_CURRENT_USER', data.username)
          this.$cookies.set('username', data.username)

          this.$router.push('/todos')
        } catch (err) {
          alert(err.response.data.message)
        }
      },

      logout({ commit }) {
        commit('CLEAR_TOKEN')
        this.$cookies.remove('token')
        this.$cookies.remove('username')
        this.$router.push('/')
      },
    },
  })
}

export default store
