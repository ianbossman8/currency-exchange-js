import reducer from './pocketsReducer'
import { EXCHANGE_CURRENCIES } from '../actions/pocketsActions'
import { CURRENCIES } from '../constant'

describe('pockets reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      [CURRENCIES.USD]: 1000,
      [CURRENCIES.EUR]: 1000,
      [CURRENCIES.GBP]: 1000,
    })
  })

  test('should handle EXCHANGE_CURRENCIES', () => {
    const action = {
      type: EXCHANGE_CURRENCIES,
      selectedCurrencies: {
        from: [CURRENCIES.USD],
        to: [CURRENCIES.GBP],
      },
      basePocketAmount: 990,
      counterPocketAmount: 1010,
    }

    expect(reducer(undefined, action)).toEqual({
      EUR: 1000,
      GBP: 1010,
      USD: 990,
    })
  })
})
