import { CURRENCIES_SIGN } from '../constant'

export function currencySignDisplay(currency, number) {
  return `${CURRENCIES_SIGN[currency]}${number}`
}
