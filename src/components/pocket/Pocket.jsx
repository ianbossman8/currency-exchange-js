import React from 'react'
import { connect } from 'react-redux'
import NumberInput from '../numberInput/NumberInput'
import { CURRENCIES, CURRENCIES_SIGN } from '../../constant'
import { PocketContainer, DropDown } from './pocket.styles'
import { Title, Description } from '../../app.styles'

function mapStateToProps(state, ownProps) {
  return {
    pocketValue: state.pockets[ownProps.currency],
    counterPocketValue: state.pockets[ownProps.counterCurrency],
    exchangeRates: state.exchangeRates.rates,
  }
}

function Pocket(props) {
  const {
    currency,
    pocketDirection,
    exchangeInfo,
    exchangeRates,
    pocketValue,
    counterPocketValue,
    isSamePocket,
    isCurrencyPairSelected,
    setCurrency,
    setExchangeInput,
  } = props

  function handleCurSelection(event) {
    setCurrency(pocketDirection, event.target.value)
  }

  return (
    <PocketContainer pocketDirection={pocketDirection}>
      <Title>{pocketDirection}</Title>

      <DropDown name={`currency-${pocketDirection}`} value={props?.currency ?? ''} onChange={handleCurSelection}>
        <option value="" disabled>
          Select a currency
        </option>
        {Object.keys(CURRENCIES).map((cur) => (
          <option value={cur} key={cur}>
            {CURRENCIES[cur]}
          </option>
        ))}
      </DropDown>

      <Description>{`balance ${
        typeof pocketValue !== 'undefined' ? `${CURRENCIES_SIGN[currency]}${pocketValue}` : '- -'
      }`}</Description>

      <NumberInput
        exchangeInfo={exchangeInfo}
        pocketDirection={pocketDirection}
        limit={pocketDirection === 'from' ? pocketValue : counterPocketValue / exchangeRates}
        disable={!isCurrencyPairSelected || isSamePocket}
        setExchangeInput={setExchangeInput}
      />
    </PocketContainer>
  )
}

export { Pocket }
export default connect(mapStateToProps)(Pocket)
