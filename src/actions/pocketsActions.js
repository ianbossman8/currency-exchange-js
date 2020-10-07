export const EXCHANGE_CURRENCIES = 'EXCHANGE_CURRENCIES'

export function exchangeCurrency(selectedCurrencies, basePocketAmount, counterPocketAmount) {
  return {
    type: EXCHANGE_CURRENCIES,
    selectedCurrencies,
    basePocketAmount,
    counterPocketAmount,
  }
}
