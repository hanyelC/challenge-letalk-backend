const { randomUUID } = require('crypto')

const { sqliteConnection } = require('../database/sqlite')

class LoanRepository {
  async index() {
    const db = await sqliteConnection()

    const loans = await db.all('SELECT * FROM loan')

    return loans
  }

  async create(cpf, UF, birth_date, total_value, monthly_payment_value) {
    const id = randomUUID()
    const db = await sqliteConnection()

    console.log(cpf)
    await db.run(`INSERT INTO loan (
      id,
      cpf,
      uf,
      total_value,
      monthly_payment_value,
      date,
      birth_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        cpf,
        UF,
        total_value,
        monthly_payment_value,
        new Date(),
        birth_date
      ])

    await db.close()
  }
}

module.exports = { LoanRepository }
