import { combineReducers } from 'redux'
import exchangeRates from '../reducers/exchangeRatesReducer'
import pockets from '../reducers/pocketsReducer'

export default combineReducers({
  exchangeRates,
  pockets,
})
