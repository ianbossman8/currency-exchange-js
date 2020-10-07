import { FETCH_RATE_SUCCESS, FETCHING_RATE, FETCH_RATE_ERROR } from '../actions/exchangeRatesActions'

const initialState = {
  error: false,
  fetching: false,
}

export default function exchangeRates(state = initialState, action) {
  switch (action.type) {
    case FETCH_RATE_SUCCESS:
      return {
        ...state,
        curPair: action.curPair,
        rates: action.rates,
        error: false,
        fetching: false,
      }
    case FETCHING_RATE:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_RATE_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
      }
    default:
      return state
  }
}
