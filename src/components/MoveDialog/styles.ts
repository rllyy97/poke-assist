import styled from "styled-components"
import { COLORS } from "../../colors"


export const MoveDialogContainer = styled.div`
  padding: 24px 16px;
  min-width: 300px;
  max-width: 470px;
`

export const PropertiesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
`

export const MovePropertyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: ${COLORS.cardDark};
  border-radius: 4px;
  padding: 12px;
`
