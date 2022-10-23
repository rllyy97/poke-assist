import { useDispatch, useSelector } from "react-redux"
import { getSelectedTabIndex } from "../../store/appStatus/appStatusSelectors"
import { setSelectedTabIndex } from "../../store/appStatus/appStatusSlice"

import SwordIcon from '../../icons/sword.svg'
import StatsIcon from '../../icons/stats.svg'
import { ReactComponent as MovesIcon } from '../../icons/moveTypes/physical-move.svg'
import { SvgIcon } from '../../GlobalComponents'
import { SvgIcon as MuiSvgIcon, Tab, Tabs } from '@mui/material'

import ShieldIcon from '@mui/icons-material/Shield';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const PokemonTabs = () => {

  const dispatch = useDispatch()
  const tabIndex = useSelector(getSelectedTabIndex)
  
  const handleTabChange = (_e: any, i: number) => dispatch(setSelectedTabIndex(i))

  return (
    <Tabs 
      value={tabIndex} 
      onChange={handleTabChange} 
      style={{marginTop: '-16px'}}
      scrollButtons="auto"
      variant="fullWidth"
    >
      <Tab icon={<SvgIcon src={SwordIcon} />} />
      <Tab icon={<ShieldIcon style={{fill: 'white'}} />} aria-label="types-def-effectiveness" />
      <Tab icon={<SvgIcon src={StatsIcon} />} />
      <Tab icon={<ArrowCircleUpIcon style={{fill: 'white'}} />} />
      {/* <Tab icon={<FightIcon style={{fill: 'white'}} />} /> */}
      <Tab icon={<MuiSvgIcon component={MovesIcon} />} />
    </Tabs>
  )
}

export default PokemonTabs