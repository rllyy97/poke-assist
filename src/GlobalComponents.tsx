import { Divider, Icon } from '@mui/material'
import styled from 'styled-components'
import { DividerContent, DividerText } from './styles'

const CustomIcon = styled(Icon)`
  /* line-height: 1; */
  /* width: 100%;
  height: 100%; */
  height: auto !important;
  flex-shrink: 1 !important;
`
const CustomImg = styled('img')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

interface IconProps {
  src: string,
  color?: "inherit" | "action" | "disabled" | "primary" | "secondary" | "error" | "info" | "success" | "warning",
  style?: any
}
export const SvgIcon = (props: IconProps) => (
  <CustomIcon color={props.color} style={props.style}>
      <CustomImg alt="" src={props.src} />
  </CustomIcon>
)

export const CustomDivider = (props: any) => (
  <Divider>
    <DividerContent>
      {props?.icon}
      {props?.text && <DividerText>{props.text}</DividerText>}
    </DividerContent>
  </Divider>
)
