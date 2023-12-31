import styled from "styled-components"
import { COLORS } from "../../../colors"
import TypeDot from "../../TypeDot"

const DamageNumber = styled.h3`
  width: 28px;
  border-radius: 4px;
  text-align: center;
  font-family: monospace;
`

const TypeRow = (props) => {

  return (
    <>
      {props.types.length > 0 &&
        <div className="flex" style={{margin: '4px 0px'}}>
          <DamageNumber style={{background: COLORS[props.value]}}>{props.label}</DamageNumber>
          <DamageNumber>×</DamageNumber>
          <div className="flex left" style={{flex: '1 1 0%'}}>
            {props.types.map((t) => <TypeDot key={t} type={t} />)}
          </div>
        </div>
      }
    </>
  )
}

export default TypeRow