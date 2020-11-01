export default function ({ store, req }) {
  store.dispatch('getTokenAndCurrentUser', req)
}
