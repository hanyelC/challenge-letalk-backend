const fees = new Object({
  MG: (fee) => { return fee / 100 },               //MG	1, 00 %
  SP: (fee) => { return (fee * 8) / 1000 },        //SP	0, 80 %
  RJ: (fee) => { return (fee * 9) / 1000 },        //RJ	0, 90 %
  ES: (fee) => { return (fee * 111) / 10000 }      //ES	1, 11 %
})

/*
{
  value: 100,
  fee: 1,
  adjustedValue: 101,
  installment: 10,
  expirationDate: 01/10/2022
},
{
  value: 91,
  fee: 1,
  adjustedValue: 92,
  installment: 10,
  expirationDate: 01/11/2022
}
*/
// const installments = []

function calculateMonthFee(installments, value, calculateFeeCB, monthlyPaymentValue, date) {

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

  return calculateMonthFee(installments, newValue, calculateFeeCB, monthlyPaymentValue, new Date(date.setMonth(date.getMonth() + 1)))
}

function simulateLoan(totalValue, state, monthlyPaymentValue) {
  const minimumTotalValue = 50000
  const minimumMonthlyPayment = totalValue / 100

  if (totalValue < minimumTotalValue) {
    return 'invalid'
  }

  if (monthlyPaymentValue < minimumMonthlyPayment) {
    return 'invalid'
  }

  if (!fees.hasOwnProperty(state)) {
    return 'invalid'
  }

  const isFeeGreaterThanMonthlyPaymentValue = Number(fees[state]).toFixed(2) > monthlyPaymentValue

  if (isFeeGreaterThanMonthlyPaymentValue) {
    return 'invalid'
  }

  let date = new Date()
  date = new Date(date.setMonth(date.getMonth() + 1))

  const installments = calculateMonthFee([], totalValue, fees[state], monthlyPaymentValue, date)

  return installments
}

console.log(simulateLoan(60000, 'MG', 15000))