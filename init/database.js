const Knex = require('knex')
const config = require('config')
const { Model } = require('objection')

module.exports = function() {
  const knex = Knex({
    client: config.get('db.client'),
    connection: config.get('db.connection'),
  })

  Model.knex(knex)
}
