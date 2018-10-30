import { createSelector, MemoizedSelector } from '@ngrx/store';
import { getBoardFeatureState, BoardFeatureState } from '../reducers';
import { Task } from '../../models/task';

export const getTaskState: any = createSelector(
  getBoardFeatureState,
  (state: BoardFeatureState) => state
);

export const getTasks: MemoizedSelector<{}, Task[]> = createSelector(getTaskState, (state: BoardFeatureState) => state.tasks.tasks);
export const getTaskLoading: any = createSelector(getTaskState, (state: BoardFeatureState) => state.tasks.loading);
export const getTaskLoaded: any = createSelector(getTaskState, (state: BoardFeatureState) => state.tasks.loaded);
