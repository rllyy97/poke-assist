import { Icon } from '@mui/material'
import styled from 'styled-components'

const CustomIcon = styled(Icon)`line-height: 1;`
const CustomImg = styled('img')`
    height: 100%;
    padding: 2px;
`

interface IconProps {
    src: string,
    color?: "inherit" | "action" | "disabled" | "primary" | "secondary" | "error" | "info" | "success" | "warning"

}
export const SvgIcon = (props: IconProps) => (
    <CustomIcon color={props.color}>
        <CustomImg alt="" src={props.src} />
    </CustomIcon>
)
