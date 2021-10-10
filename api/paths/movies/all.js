const httpError = require('http-errors')

const Movie = require('../../../models/movie')

module.exports = function () {
  let operations = {
    DELETE
  }

  async function DELETE(req, res, next) {
    const deleted = await Movie.deleteByUser(req.user.id)

    if (!deleted) {
      return next(httpError(400, 'Error deleting the user movies.'))
    }

    res.status(204).send()
  }

  DELETE.apiDoc = {
    summary: 'Delete all movies.',
    operationId: 'deleteAllMovies',
    security: [{
      bearerAuth: []
    }],
    responses: {
      204: {
        description: 'Movies deleted',
      },
      400: {
        description: 'Movies delete failed',
      },
    }
  }

  return operations
}
