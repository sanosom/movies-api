const Movie = require('../../../models/movie')

module.exports = function () {
  let operations = {
    GET,
  }

  async function GET(req, res) {
    const page = req.query.page || 1

    const movies = await Movie.findPublic(page)

    res.status(200).json(movies)
  }

  GET.apiDoc = {
    summary: 'Fetch public movies.',
    operationId: 'getPublicMovies',
    tags: ['Movies'],
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
        description: 'List public movies.',
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
    }
  }

  return operations
}
