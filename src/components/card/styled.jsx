import { Flex } from 'rebass';
import styled, { css } from 'styled-components';

export const Inner = styled(Flex)`
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  width: 100%;
  /* transform: rotateY(180deg); */
`;

export const Content = styled(Flex)`
  ${({ back }) => back && cardContentBack};
  align-items: center;
  backface-visibility: hidden;
  border-radius: 8px;
  height: 100%;
  justify-content: center;
  position: absolute;
  transition: opacity 0.3s ease-out;
  width: 100%;
  will-change: opacity;
`;

export const Card = styled(Flex)`
  cursor: ${p => (p.locked ? 'default' : 'pointer')};
  height: 150px;
  perspective: 1000px;
  ${Inner} {
    ${({ open, paired }) => (open || paired) && innerPaired}
  }
  ${Content} {
    ${({ paired }) => paired && contentPaired}
  }
`;

const cardContentBack = css`
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.4);
  transform: rotateY(180deg);
`;

const innerPaired = css`
  cursor: default;
  transform: rotateY(180deg);
`;

const contentPaired = css`
  cursor: default;
  opacity: 0.3;
`;
