import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromList from './list.reducer';

export interface BoardFeatureState {
  lists: fromList.ListState;
}

export const reducers: ActionReducerMap<BoardFeatureState> = {
  lists: fromList.reducer,
};

export const getBoardFeatureState: any = createFeatureSelector<BoardFeatureState>('board');
