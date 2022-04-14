export const state = () => {
    return {
        user: getUserFromCookie()
    }
}

export const mutations = {
    setUser (state, user) {
        state.user = user
    }
}

export const actions = {
    async createAccount({dispatch}, {username, password}) {
        const res = await this.$axios.post('/api/accounts', {
            username,
            password
        })
        if (res.status === 201) {
            dispatch('login', {
                username: username,
                password: password
            })
        }
    },

    async login ({ commit }, { username, password }) {
        const res = await this.$axios.put('/api/authentication/login', {
            username,
            password
        })
        if (res.status === 200) {
            commit('setUser', getUserFromCookie())
        }
    },

    async logout ({ commit }) {
        const res = await this.$axios.put('/api/authentication/logout')
        if (res.status === 200) {
            commit('setUser', null)
        }
    }
}

function getUserFromCookie () {
    // Check if the user cookie is set and if so get the cookie value
    const re = new RegExp("user=([^;]+)") 
    const value = re.exec(document.cookie)
    return value != null ? unescape(value[1]) : null
}