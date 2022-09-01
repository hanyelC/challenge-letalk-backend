const fs = require('fs')
const path = require('path')

const { sqliteConnection } = require('../index')

const createLoan = fs.readFileSync(path.resolve('src', 'database', 'sqlite', 'migrations', 'createLoan.sql')).toString()

/**
 * Runs the migrations on database to create the tables
 */

async function migrationsRun() {
  const schemas = [
    createLoan
  ].join('')

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(err => console.log(err))
}

module.exports = { migrationsRun }
