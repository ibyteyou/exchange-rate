export function round(value) {
  return parseFloat(value).toFixed(2)
}

export function isNumeric(str) {
  if (typeof str != 'string') return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

export const currenciesList = ['rub', 'usd', 'eur']

export const ApiCurrency = 'https://status.neuralgeneration.com/api/currency'
