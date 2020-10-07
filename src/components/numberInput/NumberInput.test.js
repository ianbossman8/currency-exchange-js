import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NumberInput from './NumberInput'

describe('NumberInput Component', () => {
  const initialProps = {
    exchangeInfo: {
      amount: 10,
      direction: 'from',
    },
    disable: true,
    limit: 10,
    pocketDirection: 'to',
    setExchangeInput: jest.fn(),
  }

  const enabledProps = {
    ...initialProps,
    disable: false
  }

  test('input should be disabled when receving disable is true props', () => {
    render(<NumberInput {...initialProps} />)
    const input = screen.getByLabelText('exchange amount')

    expect(input).toBeDisabled()
  })

  test('input should have value with empty string when it is not the same trading direction', () => {
    render(<NumberInput {...enabledProps} />)
    const input = screen.getByLabelText('exchange amount')

    expect(input.value).toBe('')
  })

  test('input should not trigger setExchangeInput when receiving not numbers', () => {
    render(<NumberInput {...enabledProps} />)
    const input = screen.getByLabelText('exchange amount')
    fireEvent.change(input, { target: { value: 'a' } })

    expect(enabledProps.setExchangeInput).toHaveBeenCalledTimes(0)
  })

  test('input should not trigger setExchangeInput when larger than limit', () => {
    render(<NumberInput {...enabledProps} />)
    const input = screen.getByLabelText('exchange amount')
    fireEvent.change(input, { target: { value: enabledProps.limit + 100 } })

    expect(enabledProps.setExchangeInput).toHaveBeenCalledTimes(0)
  })

  test('input should not trigger when has more than 2 d.p', () => {
    render(<NumberInput {...enabledProps} />)
    const input = screen.getByLabelText('exchange amount')
    fireEvent.change(input, { target: { value: 10.111 } })

    expect(enabledProps.setExchangeInput).toHaveBeenCalledTimes(0)
  })

  test('input should trigger setExchangeInput when onchange with correct format', () => {
    render(<NumberInput {...enabledProps} />)
    const input = screen.getByLabelText('exchange amount')
    fireEvent.change(input, { target: { value: 10 } })

    expect(enabledProps.setExchangeInput).toHaveBeenCalledTimes(1)
    expect(enabledProps.setExchangeInput).toHaveBeenCalledWith(enabledProps.pocketDirection, 10)
  })
})
