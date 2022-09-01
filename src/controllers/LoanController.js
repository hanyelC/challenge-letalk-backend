class LoanController {
  async index(req, res) {
    // get all loans from DB
    return res.send('Hello world')
  }

  async simulate(req, res) {
    // simulate a loan
  }
  
  async create(req, res) {
    // create a loan
  }
}

module.exports = { LoanController }
