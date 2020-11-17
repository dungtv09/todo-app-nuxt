export default function ({ store, redirect }) {
  if (!store.getters.isLogin) {
    if (process.client) {
      alert('Please login to access this page')
    }
    return redirect('/login')
  }
}
