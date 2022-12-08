import { Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import { AtomImageTypes } from './types';

export const ImageStyled = styled(Image)<AtomImageTypes>((props) => {
  const { theme } = props;
  return css`
    width: 100%;
    height: 100%;
    ${props?.css?.(theme)}
  `;
});
