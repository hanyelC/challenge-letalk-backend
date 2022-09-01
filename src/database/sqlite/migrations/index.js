const fs = require('fs')

const { sqliteConnection } = require("../index")

const createLoan = fs.readFileSync('./createLoan.sql').toString()

async function migrationsRun() {
  const schemas = [
    createLoan
  ].join('')

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(err => console.log(err))
}

module.exports = { migrationsRun }
