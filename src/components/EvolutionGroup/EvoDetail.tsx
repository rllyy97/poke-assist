import { EvolutionDetail } from "pokenode-ts";
import styled from "styled-components";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PlaceIcon from '@mui/icons-material/Place';
import GroupIcon from '@mui/icons-material/Group';

import ArrowBlock from "../../icons/arrow-block.svg"
import TradeIcon from "../../icons/trade.svg"
import RainIcon from "../../icons/rain.svg"

import { Chip } from "@mui/material"


import { ItemSpriteFromName, PokeSpriteFromUrl } from "../../utilities/stringManipulation";
import { Tooltip } from "@mui/material";
import { SvgIcon } from "../../GlobalComponents";
import TypeDot from "../TypeDot";

interface EvoDetailProps {
  detail: EvolutionDetail;
}

const DetailDiv = styled.div`
  width: 80px;
  height: 80px;
  margin: 4px;
  padding: 16px 16px 16px 4px;
  font-size: 11px;
  font-weight: bold;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0px 4px;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`

const BackgroundArrow = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  left: 0px;
`

const PokeImg = styled.img`
  margin: -24px;
`

const EvoDetail = ({ detail }: EvoDetailProps) => {

  const { 
    trigger,
    gender,
    item,
    held_item,
    known_move,
    known_move_type,
    location,
    min_level,
    min_happiness,
    min_beauty,
    min_affection,
    needs_overworld_rain,
    party_species,
    party_type,
    relative_physical_stats,
    time_of_day,
    trade_species,
    turn_upside_down,
  } = detail;

  const Item = (props: any) => {
    const displayName = props?.name?.replace('-', ' ');
    return (
      <Tooltip title={displayName}>
        <img alt='' src={ItemSpriteFromName(props?.name)} />
      </Tooltip>
    )
  }

  const Text = (props: any) => <span>{props.t.replace('-', ' ')}</span>

  return (
    <DetailDiv>
      <BackgroundArrow src={ArrowBlock} />
      {/* {trigger && <Text t={trigger?.name} />} */}
      {min_level && <Text t={`LVL ${min_level}`} />}
      {gender === 2 ? <MaleIcon color="info" />
        : gender === 1 ? <FemaleIcon color="primary" />
        : null
      }
      {item && <Item name={item?.name} />}
      {held_item && <Item name={held_item?.name} />}
      {known_move && <>
        <LightbulbIcon fontSize="small" />
        <Text t={known_move?.name} />
      </>}
      {known_move_type && <>
        <LightbulbIcon fontSize="small" />
        <TypeDot type={known_move_type?.name} size="small" />
      </>}
      {location && <>
        <Tooltip title={location.name.replace('-', ' ')}>
          <PlaceIcon />
        </Tooltip>
      </>}
      {min_beauty && <Text t={`Beauty ${min_beauty}`} />}
      {min_happiness && <Text t={`${min_happiness} ❤`} />}
      {min_affection && <Text t={`${min_affection} 💖`} />}
      {party_species && (
        <>
          <GroupIcon />
          <PokeImg alt='' src={PokeSpriteFromUrl(party_species?.url)} />
        </>
      )}
      {party_type && (
        <>
          <GroupIcon />
          <TypeDot type={party_type?.name} size="small" />
        </>
      )}
      {needs_overworld_rain && <SvgIcon src={RainIcon} />}
      {(time_of_day as string) === 'day' ? <LightModeIcon />
        : (time_of_day as string) === 'night' ? <DarkModeIcon />
        : null
      }
      {relative_physical_stats && (
        <Chip size="small" label={
          relative_physical_stats === 1 ? '+ ATK'
          : relative_physical_stats === -1 ? '+ DEF'
          : 'A = D'
        } />
      )}
      {trigger?.name === 'shed' && <Text t='shed' />}
      {trigger?.name === 'trade' && <SvgIcon src={TradeIcon} />}
      {trade_species && <PokeImg src={PokeSpriteFromUrl(trade_species?.url)} />}
      {turn_upside_down && <ScreenRotationIcon />}
    </DetailDiv>
  )
}

export default EvoDetail
