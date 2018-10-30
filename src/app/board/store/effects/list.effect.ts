import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BoardService } from '../../services/board.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as listActions from '../actions/list.action';
import { List } from '../../models/list';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import { Fail, GetAllLists, GetAllListsSuccess } from '../actions/list.action';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private boardService: BoardService) {
  }

  @Effect()
  addList$: Observable<Action> = this.actions$.pipe(
    ofType(listActions.ADD_LIST),
    switchMap((action: listActions.AddList) => {
      return this.boardService
        .addList(action['payload'])
        .pipe(
          map(() => {
            return new GetAllLists();
          }),
          catchError((error: any) => {
            return of(new Fail(error));
          })
        );
    })
  );

  @Effect()
  editList$: Observable<Action> = this.actions$.pipe(
    ofType(listActions.EDIT_LIST),
    switchMap((action: listActions.EditList) => {
      return this.boardService
        .editList(action['payload'])
        .pipe(
          map(() => {
            return new GetAllLists();
          }),
          catchError((error: any) => {
            return of(new Fail(error));
          })
        );
    })
  );

  @Effect()
  deleteList$: Observable<Action> = this.actions$.pipe(
    ofType(listActions.DELETE_LIST),
    switchMap((action: listActions.DeleteList) => {
      return this.boardService
        .deleteItem(action['payload'])
        .pipe(
          map(() => {
            return new GetAllLists();
          }),
          catchError((error: any) => {
            return of(new Fail(error));
          })
        );
    })
  );

  @Effect()
  getLists$: Observable<Action> = this.actions$.pipe(
    ofType(listActions.GET_ALL_LISTS),
    switchMap((action: listActions.GetAllLists) => {
      return this.boardService
        .getAllLists()
        .pipe(
          map((lists: List[]) => {
            return new GetAllListsSuccess(lists);
          }),
          catchError((error: any) => {
            return of(new Fail(error));
          })
        );
    })
  );
}
