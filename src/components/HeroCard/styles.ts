import styled from "styled-components";


const cardPadding = '16px'

export const HeroCardWrapper = styled<any>('div')`
  position: relative;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  gap: 12px;
  max-width: 436px;
  width: 100%;
  min-height: 436px;
  padding: ${cardPadding};
  box-sizing: border-box;

  transform-style: preserve-3d;
  & > *.float { transition: transform 0.3s; z-index: 1; }
  &:hover > *.float { transform: translateZ(30px); }
  &:hover > *.fMore { transform: translateZ(60px); }
`

const borderWidth = '12px'
export const PsuedoBorder = styled.div<{c1: string, c2: string | undefined}>`
  position: absolute;
  width: calc(100% + ${borderWidth}*2);
  height: calc(100% + ${borderWidth}*2);
  border-radius: 42px;
  border: ${borderWidth} solid transparent;
  align-self: center;
  margin-top: -28px;
  jusfity-content: center;
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
  right: ${cardPadding};
  top: ${cardPadding};
  text-transform: capitalize;

`

export const SpeciesName = styled.h1`
  text-transform: capitalize;
  padding: 0px 8px;
  max-width: calc(100% - 160px);
`

export const VariantName = styled.h4`
  position: absolute;
  top: 64px;
  left: 24px;
  text-transform: capitalize;
`