import { Chip } from "@mui/material"
import { SvgIcon } from "../../GlobalComponents"
import { TypeData } from "../../typeData"


const TypeChip = (props) => {
  const type = TypeData[props.type]
  return (
    <Chip 
      icon={<SvgIcon src={type.icon} />} 
      label={type.name}
      style={{
        background: type.color,
        paddingLeft: '4px'
      }}
    />
  )
}

export default TypeChip