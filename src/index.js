require('express-async-errors')

const { port } = require('./configs/vars')
const { app } = require('./configs/server')

app.listen(port, () => console.log(`server started at port ${port}`))