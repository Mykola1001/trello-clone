import { createSelector, MemoizedSelector } from '@ngrx/store';
import { getBoardFeatureState, BoardFeatureState } from '../reducers';
import { List } from '../../models/list';

export const getListState: any = createSelector(
  getBoardFeatureState,
  (state: BoardFeatureState) => state
);

export const getLists: MemoizedSelector<{}, List[]> = createSelector(getListState, (state: BoardFeatureState) => state.lists.lists);
export const getLoading: any = createSelector(getListState, (state: BoardFeatureState) => state.lists.loading);
export const getLoaded: any = createSelector(getListState, (state: BoardFeatureState) => state.lists.loaded);
