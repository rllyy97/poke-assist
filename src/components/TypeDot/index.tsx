import { SvgIcon } from "../../GlobalComponents"
import { TypeData } from "../../typeData"

const TypeDot = (props) => {
  const type = TypeData[props.type]
  return (
    <div
      className={"flex"}
      style={{
        background: type?.color,
        height: '32px',
        width: '32px',
        borderRadius: '16px',
        ...props.style
      }}
    >
      <SvgIcon src={type.icon} />
    </div>
  )
}

export default TypeDot