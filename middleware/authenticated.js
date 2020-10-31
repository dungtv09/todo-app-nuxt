export default function ({ store, redirect }) {
  if (!store.getters.isLogin) {
    alert('Please login to access this page')
    return redirect('/login')
  }
}
