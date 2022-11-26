import styled from "styled-components";


const cardPadding = '32px'

export const HeroCardWrapper = styled<any>('div')`
  position: relative;
  /* margin: 0px auto; */
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  padding: ${cardPadding};
  box-sizing: border-box;
`

export const PsuedoBorder = styled.div<{c1: string, c2: string | undefined}>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 48px;
  border: 12px solid transparent;
  top: 0px;
  left: 0px;
  transition: 0.2s background ease-in-out;
  background: linear-gradient(180deg, ${props => props.c1}, ${props => props?.c2 ?? props.c1}) border-box;
  -webkit-mask:
     linear-gradient(#fff 0 0) padding-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  z-index: -5;
`

export const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;

  position: absolute;
  right: 0;
  text-transform: capitalize;
`

export const SpeciesName = styled.h1`
  text-transform: capitalize;
  padding: 0px 4px;
  line-height: 1.2;
  max-width: calc(100% - 160px);
`

export const VariantName = styled.h4`
  position: absolute;
  top: 40px;
  left: 8px;
  text-transform: capitalize;
`
