const Movie = require('../../../models/movie')

module.exports = function () {
  let operations = {
    GET,
  }

  async function GET(req, res) {
    const page = req.query.page || 1

    const movies = await Movie.findPublic(page)
    const [ result ] = await Movie.countPublic()

    res.status(200).json({
      movies,
      count: result.count
    })
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
              type: 'object',
              properties: {
                movies: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Movie',
                  },
                },
                count: {
                  type: 'number',
                },
              },
            },
          },
        },
      },
    }
  }

  return operations
}
