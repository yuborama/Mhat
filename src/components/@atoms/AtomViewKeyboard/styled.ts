import { KeyboardAvoidingView } from 'react-native';
import styled, { css } from 'styled-components/native';
import { AtomViewKeyboardTypes } from './types';

export const AtomViewKeyboardStyled = styled(KeyboardAvoidingView)<AtomViewKeyboardTypes>((props) => {
  const { astheme = 'primary', theme } = props;
  return css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme?.view?.color?.[astheme] ?? '#fafafa'};
    width: 100%;
    height: auto;
    ${props?.css?.(props?.theme)}
  `;
});
