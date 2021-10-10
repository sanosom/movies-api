const httpError = require('http-errors')

const Movie = require('../../../models/movie')

module.exports = function () {
  let operations = {
    GET,
    POST,
    PUT,
    DELETE,
  }

  async function GET(req, res) {
    const page = req.query.page || 1
    const user = req.user.id

    const movies = await Movie.findByUser(user, page)

    res.status(200).json(movies)
  }

  async function POST(req, res, next) {
    const movie = {
      name: req.body.name,
      rating: req.body.rating,
      synopsys: req.body.synopsys,
      genre: req.body.genre,
      release_date: req.body.release_date,
      user: req.user.id
    }

    const created = await Movie.create(movie)

    if (!created) {
      return next(httpError(400, 'Error creating movie.'))
    }
    
    res.status(201).send()
  }

  async function PUT(req, res, next) {
    const id = req.query.id
    const user = req.user.id 

    const movie = await Movie.findById(id)

    if (!movie) {
      return next(httpError(404, 'Movie not found.'))
    }

    if (movie.user !== user) {
      return next(httpError(401, 'You are not allowed to remove this movie.'))
    }

    const updated = await Movie.updateById(id, {
      name: req.body.name,
      rating: req.body.rating,
      synopsys: req.body.synopsys,
      genre: req.body.genre,
      release_date: req.body.release_date,
    })

    if (!updated) {
      return next(httpError(400, 'Error updating the movie.'))
    }

    res.status(204).send()
  }

  async function DELETE(req, res, next) {
    const id = req.query.id
    const user = req.user.id 

    const movie = await Movie.findById(id)

    if (!movie) {
      return next(httpError(404, 'Movie not found.'))
    }

    if (movie.user !== user) {
      return next(httpError(401, 'You are not allowed to remove this movie.'))
    }

    const deleted = await Movie.deleteById(id)

    if (!deleted) {
      return next(httpError(400, 'Error deleting the movie.'))
    }

    res.status(204).send()
  }

  GET.apiDoc = {
    summary: 'Fetch movies.',
    operationId: 'getMovies',
    security: [{
      bearerAuth: []
    }],
    parameters: [
      {
        in: 'query',
        name: 'page',
        schema: {
          type: 'number',
        },
        required: false,
      }
    ],
    responses: {
      200: {
        description: 'List of movies.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Movie',
              },
            },
          },
        },
      },
      401: {
        description: 'Access token is missing or invalid',
      },
    },
  }

  POST.apiDoc = {
    summary: 'Create movie.',
    operationId: 'createMovie',
    security: [{
      bearerAuth: []
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Movie',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created',
      },
      400: {
        description: 'Error creating movie'
      },
      401: {
        description: 'Access token is missing or invalid',
      },
    },
  }

  PUT.apiDoc = {
    summary: 'Update movie.',
    operationId: 'updateMovie',
    security: [{
      bearerAuth: []
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Movie',
          },
        },
      },
    },
    parameters: [
      {
        in: 'query',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
      }
    ],
    responses: {
      204: {
        description: 'Updated',
      },
      400: {
        description: 'Update failed',
      },
      401: {
        description: 'Access token is missing or invalid',
      },
    },
  }

  DELETE.apiDoc = {
    summary: 'Delete movie.',
    operationId: 'deleteMovie',
    security: [{
      bearerAuth: []
    }],
    parameters: [
      {
        in: 'query',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
      },
    ],
    responses: {
      204: {
        description: 'Deleted',
      },
      400: {
        description: 'Delete failed',
      },
      401: {
        description: 'Access token is missing or invalid',
      },
    },
  }

  return operations
}
