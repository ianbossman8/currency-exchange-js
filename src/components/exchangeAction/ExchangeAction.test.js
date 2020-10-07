import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExchangeAction } from './ExchangeAction'

describe('ExchangeAction Component', () => {
  const initialProps = {
    exchangeRates: {
      fetching: true,
    },
    exchangeState: { amount: undefined },
    selectedCurrencies: { from: 'USD' },
  }

  test('should renders fetching rates...', () => {
    render(<ExchangeAction {...initialProps} />)
    const fetchingStatement = screen.getByText(/fetching rates.../i)

    expect(fetchingStatement).toBeInTheDocument()
  })

  test('when props are available exchange button should not be disabled and display pockets calculation', () => {
    const updatedProps = {
      ...initialProps,
      exchangeRates: {
        fetching: false,
        rates: 1,
      },
      selectedCurrencies: {
        from: 'USD',
        to: 'EUR',
      },
      toPocket: 1000,
      fromPocket: 1000,
      exchangeState: {
        direction: 'from',
        amount: 10,
      },
    }

    render(<ExchangeAction {...updatedProps} />)

    const button = screen.getByRole('button', { name: /exchange/i })
    const fromPocketText = screen.getByText(/USD balance will have \$990/i)
    const toPocketText = screen.getByText(/EUR balance will have \€1010/i)

    expect(button).not.toBeDisabled()
    expect(fromPocketText).toBeInTheDocument()
    expect(toPocketText).toBeInTheDocument()
  })

  test('button should call handleExchangeClick once when clicked', () => {
    const updatedProps = {
      ...initialProps,
      exchangeRates: {
        fetching: false,
        rates: 1,
      },
      selectedCurrencies: {
        from: 'USD',
        to: 'EUR',
      },
      toPocket: 1000,
      fromPocket: 1000,
      exchangeState: {
        direction: 'from',
        amount: 10,
      },
      exchange: jest.fn(),
      resetExchangeState: jest.fn(),
    }

    render(<ExchangeAction {...updatedProps} />)

    const button = screen.getByRole('button', { name: /exchange/i })

    userEvent.click(button)
    expect(updatedProps.resetExchangeState).toHaveBeenCalledTimes(1)
    expect(updatedProps.exchange).toHaveBeenCalledTimes(1)
  })
})
