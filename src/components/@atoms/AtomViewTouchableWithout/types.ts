import { TouchableWithoutFeedbackProps } from 'react-native';
import { ThemeColor } from '~/themes/types';
import { CSS } from '~/types';

export interface AtomViewTouchableWithoutTypes extends TouchableWithoutFeedbackProps {
  astheme?: keyof ThemeColor;
  css?: CSS;
}
