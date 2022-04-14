<template>
    <div>
        <h1>My Courses</h1>

        <v-container class="list">
            <v-row v-for="course in courses" :key="course.courseid" class="listItem">
                <v-col>
                    <nuxt-link :to="'course/' + course.coursename + '/' + course.courseid">
                        {{course.coursename}} 
                    </nuxt-link>
                </v-col>
                <v-col>
                    <v-btn @click="deleteCourse(course.courseid)">Delete</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <br>

        <v-row>
            <v-col>
                <v-form v-model="valid">
                    <v-text-field v-model="courseNameInput" :rules="nameRules" label="New Course..." required></v-text-field>
                    <v-btn @click="addCourse()">Add Course</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: 'Home',

        middleware: "auth",

        mounted() {
            this.$store.dispatch('course/getCourses')
        },

        data () {
            return {
                valid: false,
                courseNameInput: '',
                nameRules: [
                    v => !!v || 'Course Name is required'
                ]
            }
        },

        methods: {
            async addCourse() {
                await this.$store.dispatch('course/addCourse', {
                    courseName: this.courseNameInput
                })
            },

            async deleteCourse(courseId) {
                await this.$store.dispatch('course/deleteCourse', {
                    courseId
                })
            }
        },

        computed: {
            courses () {
                return this.$store.state.course.courseList
            }
        }
    }
</script>

<style>
</style>