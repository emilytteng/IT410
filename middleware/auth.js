export default function ({ store, redirect }) {
    if (process.client && !store.state.account.user) return redirect("/");
}