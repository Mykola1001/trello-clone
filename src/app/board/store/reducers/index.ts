import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromList from './list.reducer';
import * as fromTask from './task.reducer';

export interface BoardFeatureState {
  lists: fromList.ListState;
  tasks: fromTask.TaskState;
}

export const reducers: ActionReducerMap<BoardFeatureState> = {
  lists: fromList.reducer,
  tasks: fromTask.reducer
};

export const getBoardFeatureState: any = createFeatureSelector<BoardFeatureState>('board');
