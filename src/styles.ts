import styled from "styled-components";

export const SiteWrapper = styled('div')`
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PokemonWrapper = styled<any>('div')`
  

`

export const PokeImg = styled('img')`
  max-width: 300px;
  width: -webkit-fill-available;
  margin: auto;
`

export const HistoryContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`

export const HistoryTile = styled('div')`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ffffff10;
  }
`;

export const StatBar = styled('div')`
  height: 20px;
  border-radius: 4px;
  text-align: left;
  line-height: 20px;
  padding-left: 4px;
`