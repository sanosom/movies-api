const passport = require('passport')
const httpError = require('http-errors')

module.exports = async function (req, scopes, schema) {
    return new Promise((resolve, reject) => {
        passport.authenticate('bearer-auth', { session: false }, (err, user) => {
            if (err) {
                console.log(err)
                return reject(err)
            }

            if (!user) {
                return reject(httpError(404, 'Access token is missing or invalid'))
            }

            req.user = user

            resolve(!!user)
        })(req)
    })
}
