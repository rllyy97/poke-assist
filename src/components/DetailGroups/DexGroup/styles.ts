import styled from "styled-components";
import { COLORS } from "../../../colors";

export const SubstatBlock = styled('div')`
  padding: 10px 16px;
  border-radius: 16px;
  background: ${COLORS.card};
  text-align: center;
  min-width: 96px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: hidden;
  position: relative;
  cursor: default;
`;

export const GenderGroup = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  z-index: 5; 
`;

export const MGenderBar = styled('div')`
  height: 100%;
  position: absolute;
  left: 0px;
  background: #539DDF;
  z-index: -1;
`;

export const FGenderBar = styled('div')`
  height: 100%;
  position: absolute;
  right: 0px;
  background: #D3425F;
  z-index: -1;
`;