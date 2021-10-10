const bcrypt = require('bcrypt')
const { Model } = require('objection')

const Movie = require('./movie')
const Token = require('./token')
const apiDoc = require('../api/api-doc')

class User extends Model {
  static tableName = 'users'

  static jsonSchema = {
    ...apiDoc.components.schemas.User,
    properties: {
      id: {
        type: 'number',
      },
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
        type: 'string',
      }
    },
  }

  static relationMappings = {
    movies: {
      relation: Model.HasManyRelation,
      modelClass: Movie,
      join: {
        from: 'users.id',
        to: 'movies.user',
      }
    },
    likes: {
      relation: Model.ManyToManyRelation,
      modelClass: Movie,
      join: {
        from: 'users.id',
        through: {
          from: 'likes.user',
          to: 'likes.movie',
        },
        to: 'movies.id',
      }
    },
    tokens: {
      relation: Model.HasManyRelation,
      modelClass: Token,
      join: {
        from: 'users.id',
        to: 'tokens.user',
      }
    },
  }

  static async findById(id) {
    const user = await this.query().findById(id)

    return user || null
  }

  static async findByEmail(email) {
    const user = await this.query().findOne({ email })

    return user || null
  }

  static async createToken(user) {
    const token = await Token.create(user.id)

    return token || null
  }

  static async create(email, password) {
    return await this.query().insert({
      email,
      password: await bcrypt.hash(password, 10),
    }).execute()
  }
}

module.exports = User
