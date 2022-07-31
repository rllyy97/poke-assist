import styled from "styled-components";

const backgroundColor = '#1a1a1a'

export const TypeGridButtonContainer = styled.div`
  position: absolute;
  right: 0px;
`

export const TGComponentContainer = styled.div<{show: boolean}>`
  position: relative;
  overflow: hidden;
  max-height: ${props => props.show ? "600px" : "0px"};
  transition: max-height 0.3s ease-in-out;
`

export const TypeGridContainer = styled.div`
  margin-top: 12px;
  background: ${backgroundColor};
  border-radius: 8px;
  padding: 8px;
`
export const TypeGridArrow = styled.div`
  background: ${backgroundColor};
  /* background: red; */
  height: 16px;
  width: 16px;
  position: absolute;
  top: 4px;
  right: 12px;
  transform: rotate(45deg);
  border-radius: 0px 0px 32px 0px;
`
