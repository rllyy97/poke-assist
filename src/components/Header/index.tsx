
import AppIcon from '../../images/logo192.png'

const Header = () => {

  return (
    <div className='flex' style={{marginBottom: '8px'}}>
      <img alt='' src={AppIcon} style={{height: '52px'}} />
      <h1 style={{marginBottom: '0px'}}>
        PokeAssist
      </h1>
    </div>
  )
}

export default Header