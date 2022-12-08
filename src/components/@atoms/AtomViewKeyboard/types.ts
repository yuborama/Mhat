import { KeyboardAvoidingViewProps } from 'react-native';
import { ThemeColor } from '~/themes/types';
import { CSS } from '~/types';

export interface AtomViewKeyboardTypes extends KeyboardAvoidingViewProps {
  astheme?: keyof ThemeColor;
  css?: CSS;
}
