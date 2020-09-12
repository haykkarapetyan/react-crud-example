const path = require('path')
const dbPath = path.resolve(__dirname, 'db/cruddb.sqlite')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true
  })

  knex.schema
  .hasTable('posts')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('posts', (table)  => {
          table.increments('id').primary()
          table.integer('author')
          table.string('title')
          table.string('text')
        })
        .then(() => {
          console.log('Table \'Posts\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

module.exports = knex