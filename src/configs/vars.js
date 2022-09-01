const { resolve } = require('path')
require('dotenv').config({ path: resolve('..', '..', '.env') })

module.exports = {
  port: process.env.PORT || 3333
}