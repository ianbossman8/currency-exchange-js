import styled from 'styled-components'
import { blue } from '../../colours'

export const Input = styled.input`
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${blue[2]};
  border-radius: 4px;
  box-sizing: border-box;
  background-color: white;
  caret-color: ${blue[3]};

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :disabled {
    background-color: ${blue[1]};
    cursor: not-allowed;
  }
`

export const Label = styled.label`
  font-size: 0.8rem;
  text-transform: capitalize;
`
