const { AppError } = require("../utils/AppError")

class CreateLoanService {
  fees = new Object({
    MG: (fee) => { return fee / 100 },               //MG	1, 00 %
    SP: (fee) => { return (fee * 8) / 1000 },        //SP	0, 80 %
    RJ: (fee) => { return (fee * 9) / 1000 },        //RJ	0, 90 %
    ES: (fee) => { return (fee * 111) / 10000 }      //ES	1, 11 %
  })

  constructor(repository) {
    this.repository = repository
  }

  async execute(cpf, UF, dateOfBirth, totalValue, monthlyPaymentValue) {
    const minimumTotalValue = 50000
    const minimumMonthlyPayment = totalValue / 100

    if (!/^[0-9]{11}$/.test(cpf)) {
      throw new AppError('Invalid CPF')
    }

    if (!dateOfBirth) {
      throw new AppError('Date of birth is required')
    }

    if (totalValue < minimumTotalValue) {
      throw new AppError('Invalid total value, must be 50K ou more')
    }

    if (monthlyPaymentValue < minimumMonthlyPayment) {
      throw new AppError('Invalid monthly installment value, must be at least 1% of the total value')
    }

    if (!this.fees.hasOwnProperty(UF)) {
      throw new AppError('Invalid UF')
    }

    const isFeeGreaterThanMonthlyPaymentValue = Number(this.fees[UF](totalValue)).toFixed(2) >= monthlyPaymentValue

    if (isFeeGreaterThanMonthlyPaymentValue) {
      throw new AppError('Monthly installment value must be greater than the monthly fee')
    }

    await this.repository.create(cpf, UF, dateOfBirth, totalValue, monthlyPaymentValue)
  }
}

module.exports = { CreateLoanService }
