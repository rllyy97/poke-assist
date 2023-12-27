import { Chip } from "@mui/material"
import { SvgIcon } from "../../GlobalComponents"
import { TYPE_DATA } from "../../typeData"

const TypeChip = (props) => {
  const { onClick } = props
  
  const type = TYPE_DATA[props.type]

  return (
    <Chip 
      icon={<SvgIcon src={type.icon} style={{padding: '2px'}} />} 
      label={type.name}
      onClick={onClick}
      style={{
        backgroundColor: type.color,
        paddingLeft: '6px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
      }}
    />
  )
}

export default TypeChip
