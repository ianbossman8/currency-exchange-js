import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { exchangeCurrency } from '../../actions/pocketsActions'
import { ExchangeContainer, ExchangeInfo, ExchangeButton } from './exchangeAction.styles'
import { Title, Description } from '../../app.styles'
import { currencySignDisplay } from '../../util/currencySignDisplay'

function mapDispatchToProps(dispatch) {
  return {
    exchange: function (selectedCurrencies, basePocketRemain, counterPocketRemain) {
      return dispatch(exchangeCurrency(selectedCurrencies, basePocketRemain, counterPocketRemain))
    },
  }
}

function mapStateToProps(state, ownProps) {
  return {
    exchangeRates: state.exchangeRates,
    fromPocket: state.pockets[ownProps.selectedCurrencies.from],
    toPocket: state.pockets[ownProps.selectedCurrencies.to],
  }
}

function ExchangeAction(props) {
  const {
    selectedCurrencies,
    exchangeRates: { fetching, rates, error, curPair },
    exchangeState: { amount, direction },
    toPocket,
    fromPocket,
    exchange,
    exchangePair,
    resetExchangeState,
  } = props

  const basePocketRemain = useMemo(
    () => Math.round((direction === 'from' ? fromPocket - amount : fromPocket - amount * rates) * 100) / 100,
    [direction, fromPocket, amount, rates]
  )
  const counterPocketRemain = useMemo(
    () => Math.round((direction === 'to' ? toPocket + amount : toPocket + amount * rates) * 100) / 100,
    [direction, toPocket, amount, rates]
  )

  // making sure only getting the rate from the chosen currency pairs
  const confirmedRate = useMemo(() => (curPair === exchangePair ? rates : null), [curPair, exchangePair, rates])

  const baseCurrencyDisplay = currencySignDisplay(selectedCurrencies.from, 1)
  const counterCurrencyDisplay = currencySignDisplay(selectedCurrencies.to, confirmedRate)

  const basePocketRemainDisplay = currencySignDisplay(selectedCurrencies.from, basePocketRemain)
  const counterPocketRemainDisplay = currencySignDisplay(selectedCurrencies.to, counterPocketRemain)

  function handleExchangeClick() {
    exchange(selectedCurrencies, basePocketRemain, counterPocketRemain)
    resetExchangeState()
  }

  return (
    <ExchangeContainer>
      <ExchangeInfo>
        <Title>exchange rate</Title>
        <Description>{exchangePair}</Description>
        <Description>
          {error
            ? error
            : fetching
            ? 'fetching rates...'
            : confirmedRate
            ? `${baseCurrencyDisplay} : ${counterCurrencyDisplay}`
            : null}
        </Description>
        <Description>
          {amount && rates ? `${selectedCurrencies.from} balance will have ${basePocketRemainDisplay}` : null}
        </Description>
        <Description>
          {amount && rates ? `${selectedCurrencies.to} balance will have ${counterPocketRemainDisplay}` : null}
        </Description>
      </ExchangeInfo>
      <ExchangeButton disabled={!amount || !rates} onClick={handleExchangeClick}>
        exchange
      </ExchangeButton>
    </ExchangeContainer>
  )
}

export { ExchangeAction }
export default connect(mapStateToProps, mapDispatchToProps)(ExchangeAction)
