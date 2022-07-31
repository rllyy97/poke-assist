
import { IconButton } from '@mui/material'
import AppIcon from '../../images/logo192.png'

import AppsIcon from '@mui/icons-material/Apps';
import TypeGrid from '../TypeGrid';
import { TGComponentContainer, TypeGridArrow, TypeGridButtonContainer, TypeGridContainer } from './styles';
import { useState } from 'react';

const Header = () => {

  const [showTypeGrid, setShowTypeGrid] = useState(false);

  return (
    <div>
      <div className='flex' style={{marginBottom: '8px', position: 'relative'}}>
        <img alt='' src={AppIcon} style={{height: '52px'}} />
        <h1 style={{marginBottom: '0px'}}>
          PokeAssist
        </h1>
        <TypeGridButtonContainer>
          <IconButton onClick={() => setShowTypeGrid(!showTypeGrid)}><AppsIcon /></IconButton>
        </TypeGridButtonContainer>
      </div>
      <TGComponentContainer show={showTypeGrid}>
        <TypeGridArrow />
        <TypeGridContainer>
          <TypeGrid />
        </TypeGridContainer>
        <div style={{height: '16px'}} />
      </TGComponentContainer>
    </div>
  )
}

export default Header