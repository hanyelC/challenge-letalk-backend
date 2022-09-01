const { Router } = require('express')

const rootRouter = Router()

rootRouter.get('/', (req, res) => {
  return res.send('Challenge Letalk Backend')
})

module.exports = { rootRouter }
