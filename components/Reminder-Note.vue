<template>
    <v-form>
        <div>{{value}}</div>
        <v-text-field v-model="reminderInput"></v-text-field>
        <v-btn @click="$emit('my-submit', reminderInput)">Remind Me!</v-btn>
    </v-form>
</template>

<script>
export default {
    data: function() {
        return {
            reminderInput: ""
        }
    },

    props: {
        value: {
            type: String,
            default: ""
        }
    }
}
</script>
