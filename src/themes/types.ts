import { CSS } from '~/types';

export type ThemeColor = {
  primary?: string;
  secondary?: string;
  border?: string;
  accent?: string;
  hover?: string;
  shadow?: string;
  placeholder?: string;
};

export type ThemeAtomButton = {
  color?: ThemeColor;
  type?: 'flat' | 'outline';
  theme?: keyof ThemeColor;
  css?: CSS;
};
export type ThemeAtomView = {
  color?: ThemeColor;
  css?: CSS;
};

export type ThemeAtomLoader = {
  color?: ThemeColor;
  css?: CSS;
};

export type ThemeAtomIcon = {
  color?: ThemeColor;
  css?: CSS;
};

export type ThemeAtomText = {
  color?: ThemeColor;
  css?: CSS;
};

export type ThemeAtomInput2 = {
  color?: ThemeColor;
  inputSelect?: {
    colorModal?: string;
    borderColor?: string;
    colorIcon?: string;
    colorText?: string;
  };
  inputText: {
    colorLabel?: string;
    colorText?: string;
    colorBorder?: string;
    colorIcon?: string;
    colorPlaceholder?: string;
    colorError?: string;
    colorBackground?: string;
  };
  css?: CSS;
};

export type ThemeAtomInput = {
  color?: ThemeColor;
  inputText?: ThemeAtomInput2['inputText'];
  inputSelect?: ThemeAtomInput2['inputSelect'];
  css?: CSS;
};

export type ThemeScrollbar = {
  width?: number;
  thumb?: string;
  track?: string;
  css?: CSS;
};

export type ThemeShadow = {
  color?: string;
};

export type ThemeGeneral = {
  color?: ThemeColor;
};

export type Palette = {
  general?: ThemeGeneral;
  button?: ThemeAtomButton;
  view?: ThemeAtomView;
  loader?: ThemeAtomLoader;
  text?: ThemeAtomText;
  icon?: ThemeAtomIcon;
  scrollbar?: ThemeScrollbar;
  input?: ThemeAtomInput;
  shadow?: ThemeShadow;
};
