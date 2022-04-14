<template>
  <v-app dark>
  
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn @click="logout()" v-if="user != null">Log Out</v-btn>
      <v-btn @click="register()" v-if="user == null">Register</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app>
      <span v-if="user != null">Logged in as {{user}}</span>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      fixed: false,
      title: 'My Course Manager'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('account/logout')
      this.$router.push('/')
    },
    
    register () {
      this.$router.push('/register')
    }
  },
  computed: {
        user () {
            return this.$store.state.account.user
        }
    }
}
</script>
