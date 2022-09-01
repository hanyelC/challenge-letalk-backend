const { SimulateLoanService } = require('../services/SimulateLoanService')
const { CreateLoanService } = require('../services/CreateLoanService')
const { LoanRepository } = require('../repositories/LoanRepository')

class LoanController {
  async index(req, res) {
    const repository = new LoanRepository()

    const loans = await repository.index()

    return res.json(loans)
  }

  async simulate(req, res) {
    const { total_value, UF, monthly_payment_value } = req.body

    const simulateLoanService = new SimulateLoanService()

    const loanSimulation = simulateLoanService.execute(total_value, UF, monthly_payment_value)

    return res.json(loanSimulation)
  }

  async create(req, res) {
    const { cpf, UF, birth_date, total_value, monthly_payment_value } = req.body

    const repository = new LoanRepository()
    const createLoanService = new CreateLoanService(repository)

    await createLoanService.execute(cpf, UF, birth_date, total_value, monthly_payment_value)

    return res.status(201).send()
  }
}

module.exports = { LoanController }
