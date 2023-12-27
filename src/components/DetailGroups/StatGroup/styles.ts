import styled from "styled-components"
import { COLORS } from "../../../colors"

export const StatBarsContainer = styled('div')`
  gap: 2px !important;
  margin: 12px 0 12px 32px;
`

export const StatBar = styled('div')`
  height: 20px;
  border-radius: 4px;
  text-align: left;
  line-height: 20px;
  padding-left: 4px;
  color: white;
`

export const StatTotalContainer = styled('div')`
  padding: 6px 10px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0 0 8px 0;
  gap: 4px !important;
  color: ${COLORS.card};
  line-height: 1.2;
`
