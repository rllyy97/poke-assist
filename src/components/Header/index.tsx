import { Dialog, IconButton } from '@mui/material'
import AppIcon from '../../images/logo192.png'

import GitHubIcon from '@mui/icons-material/GitHub'
import AppsIcon from '@mui/icons-material/Apps'
import TypeGrid from '../TypeGrid'
import { GithubButtonContainer, TypeGridButtonContainer } from './styles'
import { useState } from 'react'

const Header = () => {

  const [showTypeGrid, setShowTypeGrid] = useState(false);

  return (
    <div>
      <div className='flex' style={{marginBottom: '8px', position: 'relative'}}>
        <img alt='' src={AppIcon} style={{height: '52px'}} />
        <h1 style={{marginBottom: '0px'}}>
          PokeAssist
        </h1>
        <GithubButtonContainer href="https://github.com/rllyy97/poke-assist" target="_blank">
          <IconButton><GitHubIcon /></IconButton>
        </GithubButtonContainer>
        <TypeGridButtonContainer>
          <IconButton onClick={() => setShowTypeGrid(!showTypeGrid)}><AppsIcon /></IconButton>
        </TypeGridButtonContainer>
      </div>
      <Dialog
        open={showTypeGrid}
        onClose={() => setShowTypeGrid(false)}
      >
        <div style={{padding: '8px'}}>
          <TypeGrid />
        </div>
      </Dialog>
    </div>
  )
}

export default Header