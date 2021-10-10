const User = require('../../../models/user')
const Like = require('../../../models/like')

module.exports = function () {
  let operations = {
    GET,
    POST,
    DELETE,
  }

  async function GET(req, res) {
    const page = req.query || 1
    const user = req.user.id

    const movies = await Like.findByUser(user, page)

    res.status(200).json(movies)
  }

  async function POST(req, res) {
    const like = {
      movie: req.body.movie,
      user: req.user.id,
    }

    const created = await Like.create(like)

    if (!created) {
      return next(httpError(400, 'Error creating movie like.'))
    }
    
    res.status(201).send()
  }

  async function DELETE(req, res) {
    const user = req.user.id 
    const movie = req.query.movie

    const like = await Like.findByUserAndMovie(user, movie)

    if (!like) {
      return next(httpError(404, 'Movie like not found.'))
    }

    if (like.user !== user) {
      return next(httpError(401, 'You are not allowed to remove this movie like.'))
    }

    const deleted = await Like.deleteById(like.id)

    if (!deleted) {
      return next(httpError(400, 'Error deleting the movie like.'))
    }

    res.status(204).send()
  }

  GET.apiDoc = {
    summary: 'Fetch liked movies.',
    operationId: 'getLikedMovies',
    tags: ['Movies'],
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
        description: 'List of liked movies.',
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
    },
  }

  POST.apiDoc = {
    summary: 'Create movie like.',
    operationId: 'createMovieLike',
    tags: ['Movies'],
    security: [{
      bearerAuth: []
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Like',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created',
      },
      400: {
        description: 'Error creating a movie like'
      },
    },
  }

  DELETE.apiDoc = {
    summary: 'Delete movie like.',
    operationId: 'deleteMovieLike',
    tags: ['Movies'],
    security: [{
      bearerAuth: []
    }],
    parameters: [
      {
        in: 'query',
        name: 'movie',
        schema: {
          type: 'string',
        },
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Deleted',
      },
      400: {
        description: 'Delete failed',
      },
    },
  }

  return operations
}
