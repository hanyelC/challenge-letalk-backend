const { Router } = require('express')

const { LoanController } = require('../controllers/LoanController')

const loanRouter = Router()
const loanController = new LoanController()

loanRouter.get('/', loanController.index)

module.exports = { loanRouter }
