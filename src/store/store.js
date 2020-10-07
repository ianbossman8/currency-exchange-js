import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export const api = {
  exchangeRateApi: 'https://api.exchangeratesapi.io/latest',
}

export default createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(api)))
