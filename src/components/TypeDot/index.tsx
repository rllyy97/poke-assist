import { SvgIcon } from "../../GlobalComponents"
import { TYPE_DATA } from "../../typeData"

const TypeDot = (props) => {
  const { size = 'medium', variant = 'circle', onClick } = props
  
  const type = TYPE_DATA[props.type]
  const pxSize =
    size === 'medium' ? '32px' : 
    size === 'small' ? '20px' :
    size;

  const padding = 
    size === 'medium' ? '6px' : 
    size === 'small' ? '4px' :
    '4px';

  const borderRadius = variant === 'square' ? '4px' : '50%';
  
  return (
    <div
      className={"flex"}
      style={{
        background: type?.color,
        width: pxSize,
        height: pxSize,
        borderRadius,
        padding,
        cursor: onClick ? 'pointer' : 'default',
        ...props.style,
      }}
      onClick={onClick}
    >
      <SvgIcon src={type.icon} />
    </div>
  )
}

export default TypeDot
