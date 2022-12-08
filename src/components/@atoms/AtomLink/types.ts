import { LinkProps } from 'react-router-native';
import { CSS } from '~/types';

export type AtomLinkTypes = LinkProps & {
  css?: CSS;
};
