const { Model } = require('objection')

const apiDoc = require('../api/api-doc')

const limit = 20

class Movie extends Model {
  static tableName = 'movies'

  static jsonSchema = apiDoc.components.schemas.Movie

  static async create(movie) {
    return await this.query().insert(movie).execute()
  }

  static async findById(id) {
    const movie = await this.query().findById(id)

    return movie || null
  }

  static async deleteById(id) {
    const deleted = await this.query().deleteById(id)

    return deleted > 0
  }

  static async updateById(id, data) {
    const updated = await this.query().findById(id).patch(data)

    return updated > 0
  }

  static async findPublic(page) {
    const offset = (page - 1) * limit

    return await this.query()
      .where('user', null)
      .limit(limit)
      .offset(offset)
      .orderBy('id')
  }

  static async findByUser(user, page) {
    const offset = (page - 1) * limit

    return await this.query()
      .where('user', user)
      .limit(limit)
      .offset(offset)
      .orderBy('id')
  }

  static async deleteByUser(user) {
    const deleted = await this.query().delete().where({
      user,
    })

    return deleted > 0
  }

  static async countPublic() {
    return await this.query().count('id as count').where('user', null)
  }

  static async countPrivate(user) {
    return await this.query().count('id as count').where('user', user)
  }
}

module.exports = Movie
