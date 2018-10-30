import { Injectable } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as taskActions from '../actions/task.action';
import { GetAllTasks, GetAllTasksSuccess } from '../actions/task.action';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import { Fail } from '../actions/list.action';
import { Task } from '../../models/task';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private boardService: BoardService) {
  }

  @Effect()
  addTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.ADD_TASK),
    switchMap((action: taskActions.AddTask) => {
      return this.boardService
        .addTask(action['payload'])
        .pipe(
          map(() => {
            return new GetAllTasks();
          }),
          catchError((error: any) => {
            return of(new Fail(error));
          })
        );
    })
  );

  @Effect()
  editTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.EDIT_TASK),
    switchMap((action: taskActions.EditTask) => {
      return this.boardService
        .editTask(action['payload'])
        .pipe(
          map(() => {
            return new GetAllTasks();
          }),
          catchError((error: any) => {
            return of(new Fail(error));
          })
        );
    })
  );

  @Effect()
  getTasks$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.GET_ALL_TASKS),
    switchMap((action: taskActions.GetAllTasks) => {
      return this.boardService
        .getAllTasks()
        .pipe(
          map((tasks: Task[]) => {
            return new GetAllTasksSuccess(tasks);
          }),
          catchError((error: any) => {
            return of(new Fail(error));
          })
        );
    })
  );

  @Effect()
  deleteTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.DELETE_TASK),
    switchMap((action: taskActions.DeleteTask) => {
      return this.boardService
        .deleteTask(action['payload'])
        .pipe(
          map(() => {
            return new GetAllTasks();
          }),
          catchError((error: any) => {
            return of(new Fail(error));
          })
        );
    })
  );
}
