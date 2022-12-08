import { ViewProps } from 'react-native';
import { ThemeColor } from '~/themes/types';
import { CSS } from '~/types';

export interface AtomViewTypes extends ViewProps {
  astheme?: keyof ThemeColor;
  css?: CSS;
}
