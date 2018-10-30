import { Action } from '@ngrx/store';
import { List } from '../../models/list';

export const ADD_LIST = '[List] Add List';
export const GET_ALL_LISTS = '[List] Get All Lists';
export const GET_ALL_LISTS_SUCCESS = '[List] Get All Lists Success';
export const EDIT_LIST = '[List] Edit List';
export const DELETE_LIST = '[List] Delete List';
export const FAIL = '[BOARD] Fail';



export class AddList implements Action {
  readonly type: string = ADD_LIST;
  constructor(public payload: List) {}
}

export class Fail implements Action {
  readonly  type: string = FAIL;
  constructor(public payload: any) {}
}

export class GetAllLists implements Action {
  readonly  type: string = GET_ALL_LISTS;
}

export class GetAllListsSuccess implements Action {
  readonly  type: string = GET_ALL_LISTS_SUCCESS;
  constructor(public payload: List[]) {}
}

export class EditList implements Action {
  readonly  type: string = EDIT_LIST;
  constructor(public payload: List) {}
}

export class DeleteList implements Action {
  readonly  type: string = DELETE_LIST;
  constructor(public payload: List) {}
}

export type Actions = AddList | Fail | GetAllLists | GetAllListsSuccess | EditList | DeleteList;
