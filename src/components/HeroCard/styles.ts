import styled from "styled-components";


export const HeroCardWrapper = styled<any>('div')`
  position: relative;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 360px;
  /* height: 600px; */
  padding: 24px 16px 48px;
  box-sizing: border-box;
  /* overflow: hidden; */
  transform-style: preserve-3d;
  transform: perspective(1000px);
`

export const PsuedoBorder = styled.div<{c1: string, c2: string | undefined}>`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: -24px;
  border-radius: 32px;
  border: 12px solid transparent;
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
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  position: absolute;
  left: -4px;
  top: 82px;
  text-transform: capitalize;
  padding: 8px 0px 16px;
  transform: translateZ(50px);
`

export const AbilityContainer = styled.div`
  position: absolute;
  bottom: 32px;
  right: -12px;
  transform: translateZ(50px);
`