<template>
  <div>
    <h1>Authentication</h1>

    <v-form v-model="valid">
      <v-text-field v-model="usernameInput" :rules="usernameRules" label="Username..." required></v-text-field>
      <v-text-field v-model="passwordInput" :rules="passwordRules" label="Password..." type="password" required></v-text-field>
      <v-btn @click="login()">Log In</v-btn>
    </v-form><br>
    
    <v-btn @click="logout()">Log Out</v-btn>
    <p></p>

    <div v-if="user !== null">
      Logged in as {{user}}
    </div>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data: () => ({
    valid: false,
    usernameInput: '',
    passwordInput: '',
    nameRules: [
      v => !!v || 'Username is required'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ]
  }),

  methods: {
    async login () {
      // debugger
      await this.$store.dispatch('account/login', {
        // username: 'user123',
        // password: 'pswd'
          username: this.usernameInput,
          password: this.passwordInput
      })
      this.$router.push('/home')
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
