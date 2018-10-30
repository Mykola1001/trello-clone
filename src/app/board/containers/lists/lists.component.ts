import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../models/list';
import { Task } from '../../models/task';
import { select, Store } from '@ngrx/store';
import { ListState } from '../../store/reducers/list.reducer';
import { AddList, GetAllLists } from '../../store/actions/list.action';
import * as fromListSelectors from '../../store/selectors/list.selector';
import { GetAllTasks } from '../../store/actions/task.action';
import * as fromTaskSelectors from '../../store/selectors/task.selector';
import { TaskState } from '../../store/reducers/task.reducer';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists$: Observable<List[]>;
  tasks$: Observable<Task[]>;
  newList;
  constructor(private store: Store<ListState>, private taskStore: Store<TaskState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetAllLists());
    this.taskStore.dispatch(new GetAllTasks());
    this.tasks$ = this.taskStore.pipe(select(fromTaskSelectors.getTasks));
    this.lists$ = this.store.pipe(select(fromListSelectors.getLists));
  }

  addList(el) {
    if (!el.value) {
      return;
    }
    this.newList = new List();
    this.newList.name = el.value;
    this.store.dispatch(new AddList(this.newList));
    el.value = '';
  }
}
