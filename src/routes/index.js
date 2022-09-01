const { Router } = require('express')

const { loanRouter } = require('./loan.routes')
const { rootRouter } = require('./root.routes')

const router = Router()

router.use('/loan', loanRouter)
router.use('/', rootRouter)

module.exports = { router }
