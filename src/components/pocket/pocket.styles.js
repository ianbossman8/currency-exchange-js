import styled, { css } from 'styled-components'
import { blue } from '../../colours'

export const PocketContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem;

  ${({ pocketDirection }) =>
    pocketDirection === 'from'
      ? css`
          border-right: 1px solid ${blue[3]};
          align-items: flex-start;
        `
      : css`
          border-left: 1px solid ${blue[3]};
          align-items: flex-end;
        `}
`

export const DropDown = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border-color: ${blue[2]};
  cursor: pointer;
`
