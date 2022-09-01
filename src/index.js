require('express-async-errors')

const { port } = require('./configs/vars')
const { app } = require('./configs/server')
const { migrationsRun } = require('./database/sqlite/migrations')

migrationsRun()

app.listen(port, () => console.log(`server started at port ${port}`))