const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const config = require('config')
const openapi = require('express-openapi')
const swaggerUi = require('swagger-ui-express')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')

const databaseInit = require('./init/database')
const passportInit = require('./init/passport')
const apiError = require('./middlewares/api-error')
const notFound = require('./middlewares/not-found')
const bearerAuth = require('./middlewares/bearer-auth')

const app = express()

databaseInit()
passportInit()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    secret: 'S3cR3tP4ssw0rd',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

openapi.initialize({
    app,
    apiDoc: require('./api/api-doc'),
    docsPath: '/docs',
    paths: path.join(__dirname, './api/paths'),
    securityHandlers: {
        bearerAuth,
    },
    errorMiddleware: apiError,
})

app.use('/', swaggerUi.serve, swaggerUi.setup(null, {
    swaggerOptions: {
        url: config.get('api.url') + 'docs',
    },
}))

app.use(notFound)
app.use(apiError)

module.exports = app
