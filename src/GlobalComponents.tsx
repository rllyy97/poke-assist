import { Icon } from '@mui/material'
import styled from 'styled-components'

const CustomIcon = styled(Icon)`line-height: 1;`
const CustomImg = styled('img')`
    height: 100%;
    padding: 2px;
`

interface IconProps { src: string }
export const SvgIcon = (props: IconProps) => (
    <CustomIcon>
        <CustomImg alt="" src={props.src} />
    </CustomIcon>
)
