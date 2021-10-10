module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'POC app API',
    version: '1.0.0',
  },
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      }
    },
    schemas: {
      Movie: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          name: {
            type: 'string',
          },
          rating: {
            type: 'string',
            enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
          },
          synopsis: {
            type: 'string'
          },
          genre: {
            type: 'string',
            enum: [
              'Action',
              'Comedy',
              'Drama',
              'Sci-fi',
              'Horror',
              'Mystery',
              'Romance',
              'Thriller',
              'Western',
              'Animation',
            ],
          },
          release_date: {
            type: 'string',
            format: 'date',
          },
          user: {
            type: 'number',
          },
        },
        required: ['name', 'rating', 'genre'],
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          }
        },
        required: ['email', 'password'],
      },
      Like: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          movie: {
            type: 'number',
          },
          user: {
            type: 'number',
          }
        },
        required: ['movie', 'user'],
      },
      Token: {
        type: 'object',
        properties: {
          token: {
            type: 'string'
          },
          user: {
            type: 'number'
          }
        }
      }
    }
  }
}
