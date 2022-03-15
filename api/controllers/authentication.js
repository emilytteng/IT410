module.exports = function (passport) {
    const authenticate = passport.authenticate('local')

    return {
        login (req, res, next) {
            console.log("login reached")
            authenticate(req, res, err => {
                if (err) return next(err)
                // tell browser to set an extra cookie
                // cookie not secure, but can help the UI determine if user is logged in or not.
                res.cookie('user', req.user.username, {
                    maxAge: 36000000 // expires in 10 hours
                })
                res.enforcer.status(200).send()
                console.log("auth success")
            })
            console.log("login success")
        },

        logout (req, res) {
            console.log("logout reached")
            if (req.user) req.logout()
            res.clearCookie("user")
            res.enforcer.status(200).send()
            console.log("logout success")
        }
    }
}