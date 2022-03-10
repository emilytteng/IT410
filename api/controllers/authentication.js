module.exports = function (passport) {
    const authenticate = passport.authenticate('local')

    return {
        login (req, res, next) {
            console.log("login reached")
            authenticate(req, res, err => {
                if (err) return next(err)
                res.enforcer.status(200).send()
                console.log("auth success")
            })
            console.log("login success")
        },

        logout (req, res) {
            console.log("logout reached")
            if (req.user) req.logout()
            res.enforcer.status(200).send()
            console.log("logout success")
        }
    }
}