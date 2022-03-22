<template>
    <div>
        <div>Logged in as {{user}}</div>

        <h1>My Courses</h1>

        <p>course</p>
        <p>course</p>
        <p>course</p>
        <br>

        <div>
            <v-btn @click="logout()">Log Out</v-btn>
        </div>
    </div>
</template>

<script>
// import reminderInput from '~/components/Reminder-Input.vue'
export default {
    name: 'Home',

    middleware: "auth",

    data () {
        return {
      
        }
    },

    // components: {
    //     reminderInput
    // },

    methods: {
        logout () {
            this.$store.dispatch('account/logout')
            this.$router.push('/')
        }
    },

    computed: {
        user () {
            return this.$store.state.account.user
        }
    }
}
</script>