import { Fragment } from "react"


const ChipRow = (props: React.PropsWithChildren<any>) => {

  const { orIcon, children, style } = props
  
  return (
    <div className="flex row" style={style}>
      {children.map((child, i) => (
        <Fragment key={i}>
          {orIcon && i !== 0 && <h6>OR</h6>}
          {child}
        </Fragment>
      ))}
    </div>
  )
}

export default ChipRow