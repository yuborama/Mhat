import 'styled-components/native';
import { IPalette } from './src/types';

declare module 'styled-components' {
  export interface DefaultTheme extends IPalette {

  }
}