import styled from "styled-components"

export const TypeGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #ffffff10;
  border-radius: 2px;

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

export const EffDotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  box-sizing: border-box;
  border: 1px solid #ffffff10;
  position: relative;
  z-index: 2;
`
