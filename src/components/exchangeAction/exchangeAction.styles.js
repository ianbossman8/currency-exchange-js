import styled from 'styled-components'
import { blue } from '../../colours'

export const ExchangeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.25fr;
  justify-content: center;
  padding: 0.5rem;
`

export const ExchangeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const ExchangeButton = styled.button`
  height: 48px;
  width: 160px;
  justify-self: center;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  background-color: ${blue[3]};
  color: white;
  font-size: 1.25rem;
  text-transform: uppercase;
  cursor: pointer;

  :hover:not(:disabled) {
    box-shadow: inset 0 0 10px ${blue[2]};
  }

  :disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`
