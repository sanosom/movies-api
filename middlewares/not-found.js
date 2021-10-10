const httpError = require('http-errors')

module.exports = (req, res, next) => {
  next(httpError(404))
}
