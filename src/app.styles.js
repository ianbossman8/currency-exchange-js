import styled from 'styled-components'
import { blue } from './colours'

export const AppContainer = styled.div`
  width: 600px;
  min-width: min-content;
  height: 300px;
  min-height: min-content;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  border: 2px solid ${blue[3]};
  border-radius: 6px;
  background-color: ${blue[1]};
  box-sizing: border-box;
`

export const Title = styled.p`
  font-size: 1.5rem;
  margin: 0;
  text-transform: uppercase;
`

export const Description = styled.p`
  height: 18px;
  margin: 0;
  text-transform: capitalize;
`
