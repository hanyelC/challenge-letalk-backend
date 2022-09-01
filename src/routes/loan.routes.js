const { Router } = require('express')

const { LoanController } = require('../controllers/LoanController')

const loanRouter = Router()
const loanController = new LoanController()

loanRouter.get('/', loanController.index)
loanRouter.post('/', loanController.create)
loanRouter.post('/simulate', loanController.simulate)

module.exports = { loanRouter }
