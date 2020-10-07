import reducer from './exchangeRatesReducer'
import { FETCH_RATE_SUCCESS, FETCH_RATE_ERROR, FETCHING_RATE } from '../actions/exchangeRatesActions'

describe('exchangeRates reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ error: false, fetching: false })
  })

  test('should handle FETCH_RATE_SUCCESS', () => {
    const action = {
      type: FETCH_RATE_SUCCESS,
      curPair: 'USD-to-EUR',
      rates: 0.8,
      error: false,
      fetching: false,
    }

    expect(reducer(undefined, action)).toEqual({ curPair: 'USD-to-EUR', error: false, fetching: false, rates: 0.8 })
  })

  test('should handle FETCHING_RATE', () => {
    const action = {
      type: FETCHING_RATE,
    }

    expect(reducer(undefined, action)).toEqual({ fetching: true, error: false })
  })

  test('should handle FETCH_RATE_ERROR', () => {
    const action = {
      type: FETCH_RATE_ERROR,
      error: 'error',
    }

    expect(reducer(undefined, action)).toEqual({ error: 'error', fetching: false })
  })
})
