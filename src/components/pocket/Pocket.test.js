import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pocket } from './Pocket'

describe('Pocket Component', () => {
  const initialProps = {
    exchangeInfo: {
      amount: undefined,
    },
    pocketDirection: 'from',
    setCurrency: jest.fn(),
  }

  test('when select is changed should be called once and with correct arg', () => {
    render(<Pocket {...initialProps} />)
    const select = screen.getByRole('combobox')
    const optionUsd = screen.getByRole('option', { name: /USD/i })

    fireEvent.change(select, { target: { value: optionUsd.textContent } })

    expect(initialProps.setCurrency).toHaveBeenCalledTimes(1)
    expect(initialProps.setCurrency).toHaveBeenCalledWith(initialProps.pocketDirection, optionUsd.textContent)
  })

  test('should display - - when pocketValue is undefined', () => {
    render(<Pocket {...initialProps} />)
    const balanceText = screen.getByText('balance - -')

    expect(balanceText).toBeInTheDocument()
  })

  test('if our options are rendered correctly', () => {
    render(<Pocket {...initialProps} />)
    const menuOptions = screen.getAllByRole('option')

    expect(menuOptions).toHaveLength(4)
  })
})
