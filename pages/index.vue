<template>
  <div>
    <h1>Authentication</h1>
    <v-btn @click="login()">Log In</v-btn>
    <v-btn @click="logout()">Log Out</v-btn>

    <div v-if="user !== null">
      Logged in as {{user}}
    </div>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  methods: {
    login () {
      this.$store.dispatch('account/login', {
        username: 'user123',
        password: 'pswd'
      })
    },

    logout () {
      this.$store.dispatch('account/logout')
    }
  },

  computed: {
      user () {
      return this.$store.state.account.user
    }
  }
}
</script>
