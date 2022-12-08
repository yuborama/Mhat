import { Link } from 'react-router-native';
import styled, { css } from 'styled-components/native';
import { AtomLinkTypes } from './types';

export const AtomLinkStyled = styled(Link)<AtomLinkTypes>((props) => {
  const { theme } = props;
  return css`
    margin: 0;
    width: auto;
    text-align: left;
    text-decoration: none;
    ${props?.css?.(theme)}
  `;
});
