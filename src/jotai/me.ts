import { atom } from 'jotai';
import { IUser } from '~/types/schemas';
import { OperationVariables, QueryResult } from '@apollo/client';
import { IQueryFilter } from '~/types';

export const MeInit = {} as IUser;

export const MeAtom = atom(MeInit);

export const QueryMeAtom = atom({} as QueryResult<IQueryFilter<'meById'>, OperationVariables>);

const MeReducers = {
  SETUSER: (_: IUser, payload: IUser) => payload,
  UPDATEUSER: (prev: IUser, payload: IUser): IUser => ({
    ...prev,
    ...payload,
  }),
  LOGOUT: () => MeInit,
};

type MeAction = {
  type: keyof typeof MeReducers;
  payload?: IUser;
};

export const MeReducer = (prev: IUser, action: MeAction) => {
  const { type, payload } = action;
  const TypeReduce = MeReducers[type];
  const Reduce = TypeReduce ? TypeReduce(prev, payload ?? MeInit) : prev;
  return Reduce;
};
