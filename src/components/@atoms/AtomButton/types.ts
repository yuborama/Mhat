import { PressableProps, TouchableOpacityProps } from 'react-native';
import { ThemeAtomButton, ThemeColor } from '~/themes/types';
import { CSS } from '~/types';
import { AtomTextTypes } from '../AtomText/types';
import { AtomViewTypes } from '../AtomView/types';

export interface AtomButtonTypes extends TouchableOpacityProps {
  loading?: boolean | 'true' | 'false';
  astheme?: keyof ThemeColor;
  astype?: ThemeAtomButton['type'];
  type?: 'button' | 'text' | 'none';
  css?: CSS;
  textProps?: AtomTextTypes;
  viewProps?: AtomViewTypes;
}
