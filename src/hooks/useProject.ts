import { useQuery } from '@apollo/client';
import { useSetAtom } from 'jotai';
import { useReducerAtom } from 'jotai/utils';
import { PROJECTBYURL } from '~/apollo/querys/project';
import CONFIG from '~/config';
import { CustomizeAtom, CustomizeInit } from '~/jotai/customize';
import { ProjectAtom, ProjectReducer } from '~/jotai/project';
import { IQueryFilter } from '~/types';

type IUseProject = {
  onCompleted?: (data: IQueryFilter<'projectByUrl'>) => void;
  onError?: () => void;
  onFinaly?: () => void;
};

const useProject = (props = {} as IUseProject) => {
  const [_, setProject] = useReducerAtom(ProjectAtom, ProjectReducer);
  const setCustomizeAtom = useSetAtom(CustomizeAtom);
  const { onCompleted, onError, onFinaly } = props;
  const query = useQuery<IQueryFilter<'projectByUrl'>>(PROJECTBYURL, {
    variables: { url: CONFIG?.PROJECT_ID },
    onCompleted: (data) => {
      setProject({
        type: 'SETPROJECT',
        payload: data?.projectByUrl,
      });
      const customizeGet = JSON.parse(
        data.projectByUrl.site?.find((site) => site?.key === 'CUSTOMIZE')?.value ??
          JSON.stringify(CustomizeInit)
      );
      setCustomizeAtom(customizeGet);
      onCompleted?.(data);
      onFinaly?.();
    },
    onError: () => {
      setProject({
        type: 'DELETEPROJECT',
      });
      onError?.();
      onFinaly?.();
    },
  });

  return query;
};

export default useProject;
