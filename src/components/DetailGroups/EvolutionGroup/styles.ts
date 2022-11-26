import styled from "styled-components";
import { COLORS } from "../../../colors";

export const Flex = styled.div<{ dir: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${props => props.dir};
  justify-content: center;
  align-items: center;
`

export const EvoSprite = styled.img`
  width: 96px;
  height: 96px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background: ${COLORS.card}
`