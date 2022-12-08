import { MotiView } from 'moti/build';
import styled, { css } from 'styled-components/native';
import { AtomViewTypes } from './types';

export const AtomViewStyled = styled(MotiView)<AtomViewTypes>((props) => {
  const { astheme = 'primary', theme } = props;
  return css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: ${theme?.view?.color?.[astheme] ?? '#fafafa'};
    width: 100%;
    height: auto;
    ${props?.css?.(props?.theme)}
  `;
});
