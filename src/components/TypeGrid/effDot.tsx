import { TypeEffectiveness, TYPE_EFF } from '../../types'

import TripOriginIcon from '@mui/icons-material/TripOrigin'
import CloseIcon from '@mui/icons-material/Close'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'

const EffDot = (props: { eff: TypeEffectiveness, faded?: boolean, size?: 'small' | 'medium' }) => {
  const { eff, faded, size = 'small' } = props;
  const style = faded ? { opacity: 0.3, transition: 'opacity 0.15s' } : { transition: 'opacity 0.15s' };

  switch(eff) {
    case TYPE_EFF.STRONG:
      return <TripOriginIcon color="success" fontSize={size} style={style} />
    case TYPE_EFF.WEAK:
      return <ChangeHistoryIcon color="warning" fontSize={size} style={style} />
    case TYPE_EFF.IMMUNE:
      return <CloseIcon color="error" fontSize={size} style={style} />
    default:
      return <></>
  }
}

export default EffDot;