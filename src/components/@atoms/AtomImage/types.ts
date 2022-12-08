import { ImageProps } from 'react-native';
import { ThemeColor } from '~/themes/types';
import { CSS } from '~/types';

export interface AtomImageTypes extends ImageProps {
  astheme?: keyof ThemeColor;
  css?: CSS;
}
