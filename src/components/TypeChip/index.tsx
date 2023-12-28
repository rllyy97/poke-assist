import { Chip } from "@mui/material"
import { SvgIcon } from "../../GlobalComponents"
import { TYPE_DATA } from "../../typeData"

const TypeChip = ({ 
  size = 'medium', 
  onClick = () => {}, 
  type, 
}) => {
  
  const { icon, name, color } = TYPE_DATA[type]

  return (
    <Chip 
      size={size as any}
      icon={<SvgIcon src={icon} style={{padding: '2px'}} />} 
      label={name}
      onClick={onClick}
      style={{
        backgroundColor: color,
        paddingLeft: '6px',
      }}
    />
  )
}

export default TypeChip
