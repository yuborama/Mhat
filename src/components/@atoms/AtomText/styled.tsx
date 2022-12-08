import { MotiText } from 'moti/build';
import styled, { css } from 'styled-components/native';
import { SSP } from '~/types';
import isBackDark from '~/utils/isBackDark';
import { AtomTextTypes } from './types';

export const AtomTextStyled = styled(MotiText)<AtomTextTypes>((props) => {
  const { theme, astheme = 'primary' } = props;
  return css`
    font-size: 14px;
    font-weight: normal;
    color: ${theme?.text?.color?.[astheme] ?? '#000000'};
    margin: 0;
    width: auto;
    text-align: left;
    ${CSSAsType(props)}
    ${props?.css?.(theme)}
  `;
});

const CSSAsType: SSP<AtomTextTypes> = (props) => {
  const { astype, astheme, theme } = props;
  const MAINTYPE = astype ?? 'text';
  const MAINTHEME = astheme ?? 'primary';
  switch (MAINTYPE) {
    case 'button':
      return typeAsButton(theme?.button?.color?.[MAINTHEME] ?? '#fe6a6a');
    case 'button-outline':
      return typeAsButtonOutline(theme?.button?.color?.[MAINTHEME] ?? '#fe6a6a');
    case 'text':
      return typeAsText(theme?.text?.color?.[MAINTHEME] ?? '#fe6a6a');
    default:
      return typeAsText(theme?.text?.color?.[MAINTHEME] ?? '#fe6a6a');
  }
};

export const typeAsButtonOutline = (color: string) => css`
  color: color;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;
export const typeAsButton = (color: string) => css`
  color: ${isBackDark(color)};
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;

export const typeAsText = (color: string) => css`
  color: ${color};
`;
