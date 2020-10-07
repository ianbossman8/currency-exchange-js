import React from 'react'
import ReactTooltip from 'react-tooltip'
import { Input, Label } from './numberInput.style'

function NumberInput(props) {
  const {
    exchangeInfo: { amount, direction },
    pocketDirection,
    limit,
    disable,
    setExchangeInput,
  } = props

  function handleNumberInput(event) {
    const parsedValue = parseFloat(event.target.value)
    
    if (isNaN(parsedValue)) {
      return setExchangeInput(pocketDirection, '')
    }

    const decimalRegex = /^\d+(\.\d{0,2})?$/ // regex to check if the value contains number only and 2 d.p

    if (!decimalRegex.test(parsedValue) || parsedValue > limit) {
      return false
    }

    return setExchangeInput(pocketDirection, parsedValue)
  }

  return (
    <>
      <Label htmlFor="exchange-amount">exchange amount</Label>
      <Input
        id="exchange-amount"
        type="number"
        data-tip
        data-for="numInput"
        value={direction === pocketDirection ? amount : ''}
        onChange={handleNumberInput}
        disabled={disable}
        placeholder="enter exchange amount"
      />
      <ReactTooltip id="numInput" place="bottom" effect="solid">
        2 decimal place and smaller than pocket balance
      </ReactTooltip>
    </>
  )
}

export default NumberInput
