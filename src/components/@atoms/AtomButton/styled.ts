import styled, { css, DefaultTheme } from 'styled-components/native';
import { AtomButtonTypes } from './types';
import { SSP } from '~/types';
import isBackDark from '~/utils/isBackDark';
import { TouchableOpacity } from 'react-native';

export const AtomButtonStyled = styled(TouchableOpacity)<AtomButtonTypes>((props) => {
  const { theme } = props;
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    min-height: 32px;
    border: 1px solid transparent;
    padding: 8px 30px;
    border-radius: 4px;
    ${CSSAsType(props)}
    ${IsDisabled(props)}
    ${props?.css?.(theme)}
  `;
});

const CSSAsType: SSP<AtomButtonTypes> = (props) => {
  const { astype, astheme, theme } = props;
  const MAINTYPE = astype ?? theme?.button?.type ?? 'flat';
  const MAINTHEME = astheme ?? theme?.button?.theme ?? 'primary';
  switch (MAINTYPE) {
    case 'outline':
      return backgroundColorOutline(theme?.button?.color?.[MAINTHEME] ?? '#fe6a6a');
    default:
      return backgroundColorHoverFlat(theme?.button?.color?.[MAINTHEME] ?? '#fe6a6a');
  }
};

const IsDisabled: SSP<AtomButtonTypes> = (props) => {
  const { disabled } = props;
  return css`
    ${disabled &&
    css`
      background-color: #e6e6e6 !important;
      color: #7e7e7e !important;
    `}
  `;
};

export const backgroundColorHoverFlat = (color: string) => css`
  background-color: ${color};
  color: ${isBackDark(color)} !important;
`;

export const backgroundColorOutline = (color: string) => css`
  background-color: transparent;
  border: 1px solid ${color};
  color: ${color} !important;
`;

export const getColorButton = (props: AtomButtonTypes, theme: DefaultTheme) => {
  const { astype, astheme } = props;
  const MAINTYPE = astype ?? theme?.button?.type ?? 'flat';
  const MAINTHEME = astheme ?? theme?.button?.theme ?? 'primary';
  switch (MAINTYPE) {
    case 'outline':
      return theme?.button?.color?.[MAINTHEME] ?? '#fe6a6a';
    case 'flat':
      return isBackDark(theme?.button?.color?.[MAINTHEME] ?? '#fe6a6a') ? '#fff' : '#000';
    default:
      return isBackDark(theme?.button?.color?.[MAINTHEME] ?? '#fe6a6a') ? '#fff' : '#000';
  }
};
