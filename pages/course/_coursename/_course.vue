<template>
    <div>
        <h1>{{$route.params.coursename}}</h1>

        <v-container class="list">
            <v-row class="columnNames">
                <v-col>
                    Done
                </v-col>
                <v-col>
                    Assignment
                </v-col>
                <v-col>
                    Due Date
                </v-col>
                <v-col>
                    
                </v-col>
            </v-row>
            
            <v-row v-for="assignment in assignments" :key="assignment.asgmtid" class="listItem">
                <v-col>
                    {{assignment.completed}}
                    <!-- <v-checkbox
                        v-model="checkbox"
                        :checked="assignment.completed">
                    </v-checkbox> -->
                </v-col>
                <v-col>
                    {{assignment.asgmtname}} 
                </v-col>
                <v-col>
                    {{assignment.duedate}}
                </v-col>
                <v-col>
                    <v-btn @click="deleteAssignment(assignment.asgmtid)">Delete</v-btn>
                </v-col>
            </v-row>

            <v-row>
                <v-form v-model="valid">
                    <v-text-field v-model="asgmtNameInput" :rules="nameRules" label="New Assignment..." required></v-text-field>
    
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Pick Due Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            @input="menu = false">
                        </v-date-picker>
                    </v-menu>

                    <v-btn @click="addAssignment()">Add Assignment</v-btn>
                </v-form>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Course',

    middleware: "auth",

    mounted() {
        this.$store.dispatch('assignment/getAssignments', {
            courseId: this.$route.params.course
        })
    },

    data () {
        return {
            valid: false,
            asgmtNameInput: '',
            nameRules: [
                v => !!v || 'Course Name is required'
            ],
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false
        }
    },

    methods: {
        async addAssignment() {
            await this.$store.dispatch('assignment/addAssignment', {
                courseId: this.$route.params.course,
                asgmtName: this.asgmtNameInput,
                dueDate: this.date
            })
        },

        async deleteAssignment(asgmtId) {
            await this.$store.dispatch('assignment/deleteAssignment', {
                courseId: this.$route.params.course,
                asgmtId
            })
        }
    },

    computed: {
        assignments () {
            return this.$store.state.assignment.assignmentList
        }
    }
}
</script>

<style>
    .columnNames {
        background-color: #242526;
        border-radius: 20pt;
    }
</style>