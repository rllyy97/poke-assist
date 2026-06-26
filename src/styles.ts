import { Chip } from "@mui/material"
import styled from "styled-components"
import { COLORS } from "./colors"

export const SiteWrapper = styled('div')`
  max-width: 502px;
  margin: 0px auto 64px;
  padding: 16px 16px 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PokeImg = styled('img')`
  max-width: 288px;
  height: 288px;
  width: -webkit-fill-available;
  margin: 0px auto;
  filter: 
    drop-shadow(1px 0px 1px #fff)
    drop-shadow(0px 1px 1px #fff)
    drop-shadow(-1px 0px 1px #fff)
    drop-shadow(0px -1px 1px #fff)
  ;
`

export const PokeImgSprite = styled(PokeImg)`
  image-rendering: pixelated;
  filter: none;
`

export const AutocompleteImg = styled('img')`
  width: 48px;
  height: 48px;
  margin: -8px 4px;
  image-rendering: pixelated;
` 

export const VariantChip = styled(Chip)`
  transition: background-color 0.3s;

  & .MuiAvatar-img {
    image-rendering: pixelated;
  }
`

export const DividerContent = styled('div')`
  display: flex;
  align-items: center;
  text-align: center;
  opacity: 0.5;
  gap: 8px;
  margin: 6px 6px;
`

export const DividerText = styled('div')`
  font-size: 14px;
  font-weight: bold;
`