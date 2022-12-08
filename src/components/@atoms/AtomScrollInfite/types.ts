import { Dispatch, SetStateAction } from 'react';
import { ListRenderItem, StyleProp, ViewStyle } from 'react-native';

export type StatePagination = {
  page: number;
  limit: number;
  hasnextpage: boolean;
  hasprevpage: boolean;
  pagingcounter: number;
  totaldocs: number;
};

export type AtomScrollInfiteTypes<T extends object> = {
  data?: T[];
  component: (data?: T) => React.ReactElement;
  pagination?: StatePagination;
  dispatch?: Dispatch<SetStateAction<StatePagination>>;
  onScroll?: () => void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
};
