const config = require('config')

module.exports = {
  client: config.get('db.client'),
  connection: {
    filename: config.get('db.connection'),
  },
  useNullAsDefault: true,
}
