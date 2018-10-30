import { Action } from '@ngrx/store';
import { Task } from '../../models/task';

export const ADD_TASK = '[TASK] Add Task';
export const GET_ALL_TASKS = '[TASK] Get All Tasks';
export const GET_ALL_TASKS_SUCCESS = '[TASK] Get All Tasks Success';
export const DELETE_TASK = '[TASK] Delete Task';
export const EDIT_TASK = '[TASK] Edit Task';

export class AddTask implements Action {
  readonly type: string = ADD_TASK;
  constructor(public payload: Task) {}
}

export class GetAllTasks implements Action {
  readonly type: string = GET_ALL_TASKS;
}

export class GetAllTasksSuccess implements Action {
  readonly type: string = GET_ALL_TASKS_SUCCESS;
  constructor(public payload: Task[]) {}
}

export class DeleteTask implements Action {
  readonly type: string = DELETE_TASK;
  constructor(public payload: Task) {}
}

export class EditTask implements Action {
  readonly type: string = EDIT_TASK;
  constructor(public payload: Task) {}
}

export type TaskActions = AddTask | GetAllTasks | GetAllTasksSuccess | DeleteTask | EditTask;
