import { atom } from 'jotai';
import { IProject } from '~/types/schemas';

export const ProjectInit = {} as IProject;

export const ProjectAtom = atom(ProjectInit);

const ProjectReducers = {
  SETPROJECT: (_: IProject, payload: IProject) => payload,
  UPDATEPROJECT: (state: IProject, payload: IProject): IProject => ({
    ...state,
    ...payload,
  }),
  DELETEPROJECT: () => ProjectInit,
};

type ProjectAction = {
  type: keyof typeof ProjectReducers;
  payload?: IProject;
};

export const ProjectReducer = (prev: IProject, action: ProjectAction) => {
  const { type, payload } = action;
  const TypeReduce = ProjectReducers[type];
  const Reduce = TypeReduce ? TypeReduce(prev, payload ?? ProjectInit) : prev;
  return Reduce;
};
