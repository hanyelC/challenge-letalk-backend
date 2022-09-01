const { Router } = require('express')

const { loanRouter } = require('./loan.routes')

const router = Router()

router.use('/loan', loanRouter)

module.exports = { router }
