import { List } from '../../models/list';
import { Actions } from '../actions/list.action';
import * as fromActions from '../actions/list.action';

export interface ListState {
  lists: List[];
  loading: boolean;
  loaded: boolean;
}

const initialState: ListState = {
  lists: [],
  loading: false,
  loaded: false
};

export function reducer(state: ListState = initialState, action: Actions): ListState {
  switch (action.type) {
    case fromActions.ADD_LIST:
      return <ListState>{
        ...state,
        loading: true
      };

    case fromActions.FAIL:
      return <ListState>{
        ...state
      };

    case fromActions.EDIT_LIST:
      return <ListState>{
        ...state,
        loading: true
      };

    case fromActions.DELETE_LIST:
      return <ListState>{
        ...state,
        loading: true
      };

    case fromActions.GET_ALL_LISTS:
      return <ListState>{
        ...state,
        loading: true,
        loaded: false
      };

    case fromActions.GET_ALL_LISTS_SUCCESS:
      return <ListState>{
        ...state,
        loading: false,
        loaded: true,
        lists: action['payload']
      };

    default:
      return state;
  }
}
