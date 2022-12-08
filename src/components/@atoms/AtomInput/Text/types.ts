import { TextInputProps } from 'react-native';
import { AtomInputTypes } from '../types';

export interface AtomInputTextTypes extends TextInputProps, AtomInputTypes {
  value?: string;
}
