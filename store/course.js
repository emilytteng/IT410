export const state = () => {
    return {
        courseList: []
    }
}

export const mutations = {
    setCourseList (state, data) {
        state.courseList = data;
    }
}

export const actions = {
    async getCourses ({ commit }) {
        const res = await this.$axios.get('/api/courses')
        try {
            if (res.status === 200) {
                commit('setCourseList', res.data)
            }
        }
        catch (e) {
            if (e.response.status == 400) {
                commit('setCourseList', [])
                alert("You Have No Courses")
            }
        }
    },

    async addCourse ({dispatch}, {courseName}) {
        try {
            const res = await this.$axios.post('/api/courses', {
                courseName
            })
            if (res.status === 201) {
                dispatch('getCourses')
            }
        }
        catch (e) {
            if (e.response.status == 409) {
                alert("Course creation error")
            }
        }
    },

    async deleteCourse ({dispatch}, {courseId}) {
        try {
            const res = await this.$axios.delete('/api/courses/' + courseId)
            if (res.status === 204) {
                dispatch('getCourses')
            }
        }
        catch (e) {
            if (e.response.status == 403) {
                alert("Course deletion error")
            }
        }
    }
}