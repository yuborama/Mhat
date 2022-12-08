import { useQuery } from '@apollo/client';
import { useSetAtom } from 'jotai';
import { useReducerAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { ME } from '~/apollo/querys/me';
import { MeAtom, MeReducer, QueryMeAtom } from '~/jotai/me';
import { IQueryFilter } from '~/types';

type IUseMe = {
  onCompleted?: (data: IQueryFilter<'meById'>) => void;
  onError?: () => void;
  onFinaly?: () => void;
};

const useMe = (props = {} as IUseMe) => {
  const [_, setMe] = useReducerAtom(MeAtom, MeReducer);
  const setQueryMe = useSetAtom(QueryMeAtom);
  const { onCompleted, onError, onFinaly } = props;
  const query = useQuery<IQueryFilter<'meById'>>(ME, {
    onCompleted: (data) => {
      setMe({
        type: 'SETUSER',
        payload: data?.meById,
      });
      onCompleted?.(data);
      onFinaly?.();
    },
    onError: () => {
      setMe({
        type: 'LOGOUT',
      });
      onError?.();
      onFinaly?.();
    },
  });

  useEffect(() => {
    setQueryMe(query);
  }, [query]);

  return query;
};

export default useMe;
