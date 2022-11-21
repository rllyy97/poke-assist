import { IconButton, Dialog, Switch } from "@mui/material";
import { useState } from "react";
import { useCurrentPokemonVariant } from "../../store/pokemonHistory/pokemonHistorySelectors";
import { SvgIcon as MuiSvgIcon } from '@mui/material';

import { ReactComponent as ShinyIcon } from './shiny.svg';
import { DefaultPokeImage, ShinyPokeImage } from "./styles";

const ShinyButton = () => {

  const [showShiny, setShowShiny] = useState(true);
  const [showShinyDialog, setShowShinyDialog] = useState(false);

  const pokemon = useCurrentPokemonVariant();
  const num = pokemon?.id;
  const defaultHomeImgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${num}.png`;
  const shinyHomeImgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${num}.png`;

  return (
    <div>
      <IconButton onClick={() => setShowShinyDialog(!showShinyDialog)}>
        <MuiSvgIcon component={ShinyIcon} />
      </IconButton>
      <Dialog
        open={showShinyDialog}
        onClose={() => {
          setShowShinyDialog(false)
          setShowShiny(true)
        }}
      >
        <div>
          <div style={{padding: '16px 16px 32px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h2>Shiny</h2>
              <Switch checked={showShiny} onChange={() => setShowShiny(!showShiny)} style={{float: 'right'}} />
            </div>
            <div style={{position: 'relative', maxWidth: '400px'}}>
              <DefaultPokeImage alt='' src={defaultHomeImgSrc} />
              <ShinyPokeImage alt='' src={shinyHomeImgSrc} faded={!showShiny} />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default ShinyButton