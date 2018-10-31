
import { Task } from '../../models/task';
import * as fromActions from '../actions/task.action';
import { TaskActions } from '../actions/task.action';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  loaded: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  loaded: false
};

export function reducer(state: TaskState = initialState, action: TaskActions): TaskState {
  switch (action.type) {
    case fromActions.ADD_TASK:
      return <TaskState>{
        ...state,
        loading: true
      };

    case fromActions.GET_ALL_TASKS:
      return <TaskState>{
        ...state,
        loading: true,
        loaded: false
      };

    case fromActions.GET_ALL_TASKS_SUCCESS:
      return <TaskState>{
        ...state,
        loading: false,
        loaded: true,
        tasks: action['payload']
      };

    case fromActions.DELETE_TASK:
      return <TaskState>{
        ...state,
        loading: true
      };

    case fromActions.DRAG_AND_DROP_TASK:
      return <TaskState>{
        ...state
      };

    default:
      return state;
  }
}
