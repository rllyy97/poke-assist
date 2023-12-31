import { TypeEffectiveness, TYPE_EFF } from '../../types'

import TripOriginIcon from '@mui/icons-material/TripOrigin'
import CloseIcon from '@mui/icons-material/Close'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'

const EffDot = (props: { eff: TypeEffectiveness}) => {
  const { eff } = props;

  switch(eff) {
    case TYPE_EFF.STRONG:
      return <TripOriginIcon color="success" fontSize="small" />
    case TYPE_EFF.WEAK:
      return <ChangeHistoryIcon color="warning" fontSize="small" />
    case TYPE_EFF.IMMUNE:
      return <CloseIcon color="error" fontSize="small" />
    default:
      return <></>
  }
}

export default EffDot;