import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { getExchangeRates, FETCH_RATE_ERROR } from './exchangeRatesActions'
import { api } from '../store/store'

const middlewares = [thunk.withExtraArgument(api)]
const mockStore = configureMockStore(middlewares)

describe('pockets actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  test('should return type FETCH_RATE_ERROR if error', () => {
    const store = mockStore({ exchangeRates: {}, pockets: {} })

    return store.dispatch(getExchangeRates('EUR', 'EUREUR')).then(() => {
      expect(store.getActions()[1].type).toEqual(FETCH_RATE_ERROR)
    })
  })

  test('should return type FETCH_RATE_SUCCESS if success', () => {
    fetchMock.getOnce('https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP', {})
    const store = mockStore({ exchangeRates: {}, pockets: {} })
    const expectedActions = [
      { type: 'FETCHING_RATE' },
      { type: 'FETCH_RATE_SUCCESS', rates: NaN, curPair: 'USD-to-GBP' },
    ]
    return store.dispatch(getExchangeRates('USD', 'GBP')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
