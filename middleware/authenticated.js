export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.getters.isLogin) {
    alert('You need to login to access this page')
    return redirect('/login')
  }
}
