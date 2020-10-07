import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from './App'
import { CURRENCIES } from './constant'

describe('App Component', () => {
  const initialState = {
    pockets: { [CURRENCIES.USD]: 1000 },
    exchangeRates: {
      fetching: false,
    },
  }

  const props = {
    getRates: jest.fn(),
  }

  const mockStore = configureStore()
  let store

  test('input should become empty when we change drop down currency', () => {
    store = mockStore(initialState)
    store.dispatch = jest.fn()

    render(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    )

    const counterCurrencySelect = screen.getAllByRole('combobox')[1]
    fireEvent.change(counterCurrencySelect, { target: { value: 'EUR' } })
    expect(store.dispatch).toHaveBeenCalledTimes(1)

    const input = screen.getByLabelText('exchange amount')
    fireEvent.change(input, { target: { value: 10 } })
    fireEvent.change(counterCurrencySelect, { target: { value: 'GBP' } })

    expect(input.value).toBe('')
  })

  test('getRates should be called every 10 secdon', () => {
    store = mockStore(initialState)
    store.dispatch = jest.fn()
    render(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    )

    jest.useFakeTimers()
    const counterCurrencySelect = screen.getAllByRole('combobox')[1]
    fireEvent.change(counterCurrencySelect, { target: { value: 'EUR' } })

    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 10000)
  })
})
