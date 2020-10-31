export default function ({ store, redirect }) {
  if (!store.getters.isLogin) {
    return redirect('/login')
  }
}
