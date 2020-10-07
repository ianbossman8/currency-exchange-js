import currencyPairFormatter from '../util/currencyPairFormatter'

export const FETCH_RATE_SUCCESS = 'FETCH_RATE_SUCCESS'
export const FETCH_RATE_ERROR = 'FETCH_RATE_ERROR'
export const FETCHING_RATE = 'FETCHING_RATE'

function fetchErrorCatcher(error) {
  return {
    type: FETCH_RATE_ERROR,
    error,
  }
}

function fetchingRate() {
  return {
    type: FETCHING_RATE,
  }
}

function successFetchingRate(rates, curPair) {
  return {
    type: FETCH_RATE_SUCCESS,
    rates,
    curPair,
  }
}

export function getExchangeRates(from, to) {
  return async function (dispatch, _, api) {
    const curPair = currencyPairFormatter(from, to)
    dispatch(fetchingRate())

    try {
      const exchangeRateResponse = await fetch(`${api.exchangeRateApi}?base=${from}&symbols=${to}`)

      if (exchangeRateResponse.ok) {
        const rates = await exchangeRateResponse.json()
        const roundedNumber = Math.round(rates.rates?.[to] * 10000) / 10000 // round to 4 d.p

        return dispatch(successFetchingRate(roundedNumber, curPair))
      }

      throw new Error('error fetching rates')
    } catch (error) {
      return dispatch(fetchErrorCatcher(error.message))
    }
  }
}
