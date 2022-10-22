import styled from "styled-components";

export const EvolutionGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
`

export const Flex = styled.div<{ dir: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${props => props.dir};
  justify-content: center;
  align-items: center;
`

export const EvoSprite = styled.img`
  width: 96px;
  height: 96px;
`