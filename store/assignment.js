export const state = () => {
    return {
        assignmentList: []
    }
}

export const mutations = {
    setAssignmentList (state, data) {
        state.assignmentList = data;
    }
}

export const actions = {
    async getAssignments ({ commit }, {courseId}) {
        const res = await this.$axios.get('/api/courses/' + courseId)
        try {
            if (res.status === 200) {
                commit('setAssignmentList', res.data)
            }
        }
        catch (e) {
            if (e.response.status == 400) {
                commit('setAssignmentList', [])
                alert("Course Has No Assignments")
            }
        }
    },

    async addAssignment ({dispatch}, {courseId, asgmtName, dueDate}) {
        try {
            const res = await this.$axios.post('/api/courses/' + courseId, {
                asgmtName,
                dueDate
            })
            if (res.status === 201) {
                dispatch('getAssignments', {
                    courseId
                })
            }
        }
        catch (e) {
            if (e.response.status == 409) {
                alert("Assignment creation error")
            }
        }
    },

    async deleteAssignment ({dispatch}, {courseId, asgmtId}) {
        console.log("AsgmtID: " + asgmtId)
        try {
            const res = await this.$axios.delete('/api/courses/' + courseId + '/' + asgmtId)
            if (res.status === 204) {
                dispatch('getAssignments', {
                    courseId
                })
            }
        }
        catch (e) {
            if (e.response.status == 403) {
                alert("Assignment deletion error")
            }
        }
    }
}