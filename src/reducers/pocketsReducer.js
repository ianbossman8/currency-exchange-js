import { EXCHANGE_CURRENCIES } from '../actions/pocketsActions'
import { CURRENCIES } from '../constant'

const initialState = {
  [CURRENCIES.USD]: 1000,
  [CURRENCIES.EUR]: 1000,
  [CURRENCIES.GBP]: 1000,
}

export default function pockets(state = initialState, action) {
  switch (action.type) {
    case EXCHANGE_CURRENCIES:
      return {
        ...state,
        [action.selectedCurrencies.from]: action.basePocketAmount,
        [action.selectedCurrencies.to]: action.counterPocketAmount,
      }
    default:
      return state
  }
}
