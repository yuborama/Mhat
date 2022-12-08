import { TextProps } from 'react-native';
import { ThemeColor } from '~/themes/types';
import { CSS } from '~/types';

type AtomTextKeys = 'text' | 'button' | 'button-outline';

export type AtomTextTypes = TextProps & {
  astype?: AtomTextKeys;
  astheme?: keyof ThemeColor;
  css?: CSS;
};
