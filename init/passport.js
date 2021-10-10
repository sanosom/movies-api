const passport = require('passport')
const BearerStrategy = require('passport-http-bearer')

const User = require('../models/user')
const Token = require('../models/Token')

module.exports = function() {
    passport.use(
        'bearer-auth',
        new BearerStrategy((token, done) => {
            Token.validate(token)
                .then((user) => {
                    if (!user) {
                        return done(null, false)
                    }
    
                    done(null, user, { scope: 'all' })
                })
                .catch((err) => {
                    console.log(err)
                    done(err)
                })
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((userId, done) => {
        User.findById(userId)
            .then((user) => done(null, user))
            .catch(done)
    })
}
