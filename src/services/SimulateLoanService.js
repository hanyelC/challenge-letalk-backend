const { AppError } = require('../utils/AppError')

class SimulateLoanService {
  fees = new Object({
    MG: (value) => { return value / 100 },               //MG	1, 00 %
    SP: (value) => { return (value * 8) / 1000 },        //SP	0, 80 %
    RJ: (value) => { return (value * 9) / 1000 },        //RJ	0, 90 %
    ES: (value) => { return (value * 111) / 10000 }      //ES	1, 11 %
  })

  calculateMonthFee(installments, value, calculateFeeCB, monthlyPaymentValue, date) {
    const installment = {}

    installment.value = value
    const fee = Number(calculateFeeCB(value).toFixed(2))
    installment.fee = fee

    const adjustedValue = Number((value + fee).toFixed(2))
    installment.adjustedValue = adjustedValue

    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    installment.expirationDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`

    if (adjustedValue <= monthlyPaymentValue) {
      installment.installment = adjustedValue
      installments.push(installment)
      return installments
    }

    installment.installment = monthlyPaymentValue

    installments.push(installment)

    const newValue = Number((adjustedValue - monthlyPaymentValue).toFixed(2))

    return this.calculateMonthFee(installments, newValue, calculateFeeCB, monthlyPaymentValue, new Date(date.setMonth(date.getMonth() + 1)))
  }

  execute(totalValue, UF, monthlyPaymentValue) {
    const minimumTotalValue = 50000
    const minimumMonthlyPayment = totalValue / 100

    if (totalValue < minimumTotalValue) {
      throw new AppError('Invalid total value, must be 50K ou more')
    }

    if (monthlyPaymentValue < minimumMonthlyPayment) {
      throw new AppError('Invalid monthly installment value, must be at least 1% of the total value')
    }

    if (!this.fees.hasOwnProperty(UF)) {
      throw new AppError('Invalid UF')
    }

    const isFeeGreaterThanMonthlyPaymentValue = Number(this.fees[UF](totalValue)).toFixed(2) > monthlyPaymentValue

    if (isFeeGreaterThanMonthlyPaymentValue) {
      throw new AppError('Monthly installment value must be greater than the monthly fee')
    }

    let date = new Date()
    date = new Date(date.setMonth(date.getMonth() + 1))

    const installments = this.calculateMonthFee([], totalValue, this.fees[UF], monthlyPaymentValue, date)

    return installments
  }
}

module.exports = { SimulateLoanService }
