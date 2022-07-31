import { SvgIcon } from "../../GlobalComponents"
import { TYPE_DATA } from "../../typeData"

const TypeDot = (props) => {

  const { size = 'medium' } = props
  
  const type = TYPE_DATA[props.type]
  const pxSize = props.size !== 'small' ? '32px' : '20px';
  
  return (
    <div
      className={"flex"}
      style={{
        background: type?.color,
        width: pxSize,
        height: pxSize,
        borderRadius: '50%',
        ...props.style
      }}
    >
      <SvgIcon src={type.icon} size={size} />
    </div>
  )
}

export default TypeDot