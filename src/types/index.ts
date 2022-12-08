import { Palette } from '../themes/types';
import { StateMachine, AnyEventObject } from 'xstate';
import { ReactNode } from 'react';
import { themes } from '~themes/index';
import { IMutation, IQuery } from './schemas';
import { FlattenSimpleInterpolation } from 'styled-components';
import { DefaultTheme } from 'styled-components/native';

export type IPalette = Palette;

export type CSSType = FlattenSimpleInterpolation;

export type CSS = (theme: DefaultTheme) => FlattenSimpleInterpolation;
export type WithTheme<P = {}, T = DefaultTheme> = P & { theme: T };
export type RDC = Record<string, unknown>;
export type SSP<P = RDC> = (props: WithTheme<P, DefaultTheme>) => FlattenSimpleInterpolation;

export type ThemesFamily = {
  select: {
    [key: string]: IPalette;
  };
  machine: StateMachine<string, any, AnyEventObject>;
};

export type ThemeKeyType = keyof typeof themes | 'auto';

export type ThemesFamilyType = [ThemeKeyType, (key?: ThemeKeyType) => void];

export type ThemeType = {
  key: ThemeKeyType;
  theme: IPalette;
};

export type ThemeContextProps = {
  themes: ThemesFamily;
  children: ReactNode;
  defaultTheme: IPalette;
};

export type IChildren = {
  props: {
    path: string;
    element: {
      props: {
        auth?: string;
        layout: string;
      };
    };
  };
};

export type IAuth = {
  exit?: string[];
  children: IChildren;
};

export type ILayout = {
  children: IChildren;
};

export type IQueryFilter<T extends keyof IQuery> = Pick<IQuery, T>;
export type IMutationFilter<T extends keyof IMutation> = Pick<IMutation, T>;

export type IGraphQLResponseRoot = {
  data?: IQuery | IMutation;
  errors?: Array<IGraphQLResponseError>;
};

interface IGraphQLResponseError {
  message: string;
  locations?: Array<IGraphQLResponseErrorLocation>;
  [propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
  line: number;
  column: number;
}
