import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import Pocket from './components/pocket/Pocket'
import ExchangeAction from './components/exchangeAction/ExchangeAction'
import { getExchangeRates } from './actions/exchangeRatesActions'
import { CURRENCIES } from './constant'
import currencyPairFormatter from './util/currencyPairFormatter'
import { AppContainer } from './app.styles'

const initialCurrencyState = {
  from: CURRENCIES.USD,
  to: undefined,
}

const initialExchangeState = {
  direction: 'from',
  amount: '',
}

function mapDispatchToProps(dispatch) {
  return {
    getRates: function (from, to) {
      return dispatch(getExchangeRates(from, to))
    },
  }
}

function App(props) {
  const { getRates } = props
  const [selectedCurrencies, setCurrencies] = useState(initialCurrencyState)
  const [exchangeState, setExchangeState] = useState(initialExchangeState)

  const { from, to } = selectedCurrencies

  const exchangePair = useMemo(
    () => typeof from !== 'undefined' && typeof to !== 'undefined' && currencyPairFormatter(from, to),
    [from, to]
  )

  const isSamePocket = from === to

  useEffect(() => {
    let id
    const interval = 10000

    if (exchangePair) {
      getRates(from, to)
      id = setInterval(() => getRates(from, to), interval)
    }

    return () => clearInterval(id)
  }, [getRates, from, to, exchangePair])

  useEffect(() => {
    resetExchangeState()
  }, [selectedCurrencies])

  function handleCurrencySelect(direction, currency) {
    setCurrencies((selectedCurrencies) => ({
      ...selectedCurrencies,
      [direction]: currency,
    }))
  }

  function handleExchangeInput(direction, amount) {
    setExchangeState({
      direction,
      amount,
    })
  }

  function resetExchangeState() {
    setExchangeState(initialExchangeState)
  }

  return (
    <AppContainer>
      <Pocket
        currency={from}
        exchangeInfo={exchangeState}
        pocketDirection={'from'}
        isSamePocket={isSamePocket}
        isCurrencyPairSelected={exchangePair}
        setCurrency={handleCurrencySelect}
        setExchangeInput={handleExchangeInput}
      />

      <ExchangeAction
        selectedCurrencies={selectedCurrencies}
        exchangePair={exchangePair}
        exchangeState={exchangeState}
        resetExchangeState={resetExchangeState}
      />

      <Pocket
        currency={to}
        counterCurrency={from}
        exchangeInfo={exchangeState}
        pocketDirection={'to'}
        isSamePocket={isSamePocket}
        isCurrencyPairSelected={exchangePair}
        setCurrency={handleCurrencySelect}
        setExchangeInput={handleExchangeInput}
      />
    </AppContainer>
  )
}

export { App }
export default connect(null, mapDispatchToProps)(App)
