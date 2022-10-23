import { SvgIcon } from "../../GlobalComponents"
import { TYPE_DATA } from "../../typeData"

const TypeDot = (props) => {
  const { size = 'medium' } = props
  
  const type = TYPE_DATA[props.type]
  const pxSize =
    size === 'medium' ? '32px' : 
    size === 'small' ? '20px' :
    size;

  const padding = 
    size === 'medium' ? '6px' : 
    size === 'small' ? '4px' :
    '4px';
  
  return (
    <div
      className={"flex"}
      style={{
        background: type?.color,
        width: pxSize,
        height: pxSize,
        borderRadius: '50%',
        padding,
        ...props.style
      }}
    >
      <SvgIcon src={type.icon} />
    </div>
  )
}

export default TypeDot