<template>
  <div>
    <h1>Authentication</h1>

    <v-form v-model="valid">
      <v-text-field v-model="usernameInput" :rules="usernameRules" label="Username..." required></v-text-field>
      <v-text-field v-model="passwordInput" :rules="passwordRules" label="Password..." type="password" required></v-text-field>
      <v-btn @click="login()">Log In</v-btn>
    </v-form>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data: () => ({
    valid: false,
    usernameInput: '',
    passwordInput: '',
    usernameRules: [
      v => !!v || 'Username is required'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ]
  }),

  methods: {
    async login () {
      await this.$store.dispatch('account/login', {
          username: this.usernameInput,
          password: this.passwordInput
      })
      this.$router.push('/home')
    }
  },

  computed: {
      user () {
        return this.$store.state.account.user
    }
  }
}
</script>
