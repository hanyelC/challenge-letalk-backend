const { SimulateLoanService } = require('../services/SimulateLoanService')

class LoanController {
  async index(req, res) {
    // get all loans from DB
    return res.send('Hello world')
  }

  async simulate(req, res) {
    const { total_value, UF, monthly_payment_value } = req.body

    const simulateLoanService = new SimulateLoanService()

    const loanSimulation = simulateLoanService.execute(total_value, UF, monthly_payment_value)

    return res.json(loanSimulation)
  }

  async create(req, res) {
    // create a loan
  }
}

module.exports = { LoanController }
