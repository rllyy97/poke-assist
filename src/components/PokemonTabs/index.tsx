import { useDispatch, useSelector } from "react-redux"
import { getSelectedTabIndex } from "../../store/appStatus/appStatusSelectors"
import { setSelectedTabIndex } from "../../store/appStatus/appStatusSlice"

import { ReactComponent as SwordIcon } from '../../icons/sword.svg'
import { ReactComponent as StatsIcon } from '../../icons/stats.svg'
import { ReactComponent as MovesIcon } from '../../icons/moveTypes/physical-move.svg'
import { SvgIcon as MuiSvgIcon, Tab, Tabs } from '@mui/material'

import TextSnippetIcon from '@mui/icons-material/TextSnippet';

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
      <Tab icon={<MuiSvgIcon component={SwordIcon} />} />
      <Tab icon={<MuiSvgIcon component={StatsIcon} />} />
      <Tab icon={<MuiSvgIcon component={TextSnippetIcon} />} />
      <Tab icon={<MuiSvgIcon component={MovesIcon} />} />
    </Tabs>
  )
}

export default PokemonTabs