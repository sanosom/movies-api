const { v4: uuid } = require('uuid')
const { Model } = require('objection')

const User = require('./user')
const apiDoc = require('../api/api-doc')

class Token extends Model {
    static idColumn = 'token'

    static tableName = 'tokens'

    static jsonSchema = apiDoc.components.schemas.Token

    static async create(user) {
        return await this.query().insertAndFetch({
            user,
            token: uuid(),
        }).execute()
    }

    static async validate(token) {
        const result = await this.query().findOne({ token })

        if (!result) {
            return false
        }

        return await User.findById(result.user)
    }
}

module.exports = Token
