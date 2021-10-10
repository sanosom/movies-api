const { Model } = require('objection')

const Movie = require('./movie')
const User = require('./user')
const apiDoc = require('../api/api-doc')

const limit = 5

class Like extends Model {
  static tableName = 'likes'

  static jsonSchema = apiDoc.components.schemas.Like

  static relationMappings = {
    movies: {
      relation: Model.HasManyRelation,
      modelClass: Movie,
      join: {
        from: 'likes.movie',
        to: 'movies.user',
      }
    },
  }

  static async create(like) {
    return await this.query().insert(like).execute()
  }

  static async deleteById(id) {
    const deleted = await this.query().deleteById(id)
    
    return deleted > 0
  }

  static async findByUser(user, page) {
    const offset = (page - 1) * limit

    return await User.relatedQuery('likes')
      .for(user)
      .limit(limit)
      .offset(offset)
      .orderBy('id')
  }

  static async findByUserAndMovie(user, movie) {
    const like = await this.query().findOne({
      user,
      movie,
    })

    return like || null
  }
}

module.exports = Like
