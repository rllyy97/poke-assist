import styled from "styled-components"

const backgroundColor = '#222'

export const TypeGridContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TypeRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TypeRowLabel = styled.div`
  padding: 4px;
  border-right: 1px dotted grey;
`

export const EffDotContainer = styled.div<{hover?: boolean, typeColorX?: string, typeColorY?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  flex: 0 0 auto;
	border-top: 1px solid #ffffff00;
	border-left: 1px solid #ffffff00;
	border-bottom: 1px solid #ffffff10;
	border-right: 1px solid #ffffff10;

  ${props => props.hover && `
    background: ${backgroundColor};
    border-top: 1px solid ${props.typeColorX ?? '#ffffff10'};
    border-left: 1px solid ${props.typeColorY ?? '#ffffff10'};
    border-bottom: 1px solid ${props.typeColorX ?? '#ffffff10'};
    border-right: 1px solid ${props.typeColorY ?? '#ffffff10'};
  `}
`
