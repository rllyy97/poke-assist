import { useDispatch } from "react-redux"
import { useSelectedTabIndex } from "../../store/appStatus/appStatusSelectors"
import { setSelectedTabIndex } from "../../store/appStatus/appStatusSlice"

import SwordIcon from '../../icons/sword.svg?react'
import MovesIcon from '../../icons/moveTypes/physical-move.svg?react'
import { SvgIcon as MuiSvgIcon, Tab, Tabs } from '@mui/material'

import TextSnippetIcon from '@mui/icons-material/TextSnippet'

const PokemonTabs = () => {

  const dispatch = useDispatch()
  const tabIndex = useSelectedTabIndex()
  
  const handleTabChange = (_e: any, i: number) => dispatch(setSelectedTabIndex(i))

  return (
    <Tabs 
      value={tabIndex} 
      onChange={handleTabChange} 
      scrollButtons="auto"
      variant="fullWidth"
    >
      <Tab icon={<MuiSvgIcon component={SwordIcon} />} />
      <Tab icon={<MuiSvgIcon component={TextSnippetIcon} />} />
      <Tab icon={<MuiSvgIcon component={MovesIcon} />} />
    </Tabs>
  )
}

export default PokemonTabs