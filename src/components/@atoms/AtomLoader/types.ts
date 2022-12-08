import { AnimatedLottieViewProps } from 'lottie-react-native';
import { ThemeColor } from '~/themes/types';

export type AtomLoaderKeys = 'big' | 'medium' | 'small' | 'button';

export type AtomLoaderTypes = Omit<AnimatedLottieViewProps, 'source'> & {
  loading?: boolean | 'true' | 'false';
  astype?: AtomLoaderKeys;
  astheme?: keyof ThemeColor;
  color?: string;
};
