import styled from "styled-components";

export const SiteWrapper = styled('div')`
  max-width: 534px;
  margin: 0px auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PokeImg = styled('img')`
  max-width: 300px;
  height: 300px;
  width: -webkit-fill-available;
  margin: 0px auto;
  filter: 
    drop-shadow(1px 0px 1px #fff)
    drop-shadow(0px 1px 1px #fff)
    drop-shadow(-1px 0px 1px #fff)
    drop-shadow(0px -1px 1px #fff)
    ;
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

export const AutocompleteImg = styled('img')`
  width: 32px;
  height: 32px;
  margin: -8px 4px;
` 