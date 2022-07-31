import { Icon } from '@mui/material'
import styled from 'styled-components'

const CustomIcon = styled(Icon)`
    /* line-height: 1; */
`
const CustomImg = styled('img')`
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

interface IconProps {
    src: string,
    color?: "inherit" | "action" | "disabled" | "primary" | "secondary" | "error" | "info" | "success" | "warning",
    size?: "small" | "medium" | "large"
}
export const SvgIcon = (props: IconProps) => (
    <CustomIcon color={props.color} style={props.size === 'small' ? {padding: '2px 0px 6px'} : {}}>
        <CustomImg alt="" src={props.src} />
    </CustomIcon>
)
