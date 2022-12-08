import { FC } from 'react';
import { AuthsKeys, LayoutsKeys } from '~/auth/index';
declare module 'react' {
  export * from 'react';
  export type FCN<T = {}> = FC<
    T & {
      auth?: AuthsKeys;
      layout?: LayoutsKeys;
      role?: string;
    }
  >;
}
