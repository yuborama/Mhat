import { ImageBackground } from 'react-native';
import styled, { css } from 'styled-components/native';
import { AtomBackgroundImageTypes } from './types';

export const AtomBackgroundImageStyled = styled(ImageBackground)<AtomBackgroundImageTypes>(
  (props) => {
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
  }
);
