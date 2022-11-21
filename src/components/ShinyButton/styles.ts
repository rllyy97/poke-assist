import styled from "styled-components";

export const DefaultPokeImage = styled('img')`
  width: 512px;
  max-width: 100%;
  aspect-ratio: 1/1;
`

export const ShinyPokeImage = styled('img')<{faded?: boolean}>`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => props.faded ? 0 : 1};
  transition: 0.2s opacity ease-in-out;
`