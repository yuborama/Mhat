import { ImageBackgroundProps } from 'react-native';
import { ThemeColor } from '~/themes/types';
import { CSS } from '~/types';

export interface AtomBackgroundImageTypes extends ImageBackgroundProps {
  astheme?: keyof ThemeColor;
  css?: CSS;
}
