import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../models/list';
import { Task } from '../../models/task';
import { select, Store } from '@ngrx/store';
import { ListState } from '../../store/reducers/list.reducer';
import { AddList, DeleteList, EditList, GetAllLists } from '../../store/actions/list.action';
import * as fromListSelectors from '../../store/selectors/list.selector';
import { AddTask, DragAndDropTask, GetAllTasks } from '../../store/actions/task.action';
import * as fromTaskSelectors from '../../store/selectors/task.selector';
import { TaskState } from '../../store/reducers/task.reducer';
import { DeleteConfirmDialogComponent } from '../../components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists$: Observable<List[]>;
  tasks$: Observable<Task[]>;
  newList;
  // isInlineEdit for editing in place
  isInlineEdit = false;
  isInlineAddTask = false;
  listIndex;
  editListData;
  taskData;
  deleteConfirmDialogRef: MatDialogRef<DeleteConfirmDialogComponent>;
  constructor(private store: Store<ListState>, private taskStore: Store<TaskState>, public dialog: MatDialog) {
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

  inlineEdit(i) {
    this.isInlineEdit = true;
    this.listIndex = i;
  }

  inlineAddTask(i) {
    this.isInlineAddTask = this.isInlineAddTask === false;
    if (this.listIndex) {
      this.listIndex = null;
    } else {
      this.listIndex = i;
    }
  }

  editList (id: string, data) {
    this.editListData = new List();
    this.editListData.id = id;
    if (!data.value) {
      data.value = 'Unnamed list';
    }
    this.editListData.name = data.value;
    this.isInlineEdit = false;
    this.listIndex = null;
    this.store.dispatch(new EditList(this.editListData));
  }

  addTask(listId: string, data) {
    if (!data.value) {
      return;
    }
    this.taskData = new Task();
    this.taskData.listId = listId;
    this.taskData.name = data.value;
    this.store.dispatch(new AddTask(this.taskData));
    data.value = '';
  }

  openDialog(list: List): void {
    this.deleteConfirmDialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    this.deleteConfirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteList(list));
      }
      this.deleteConfirmDialogRef = null;
    });
  }

  drop(event: CdkDragDrop<any>) {
    const data = {
      prevIndex: event.previousIndex,
      nextIndex: event.currentIndex,
      prevListId: event.previousContainer.data['id'],
      nextListId: event.container.data['id']
    };
    this.store.dispatch(new DragAndDropTask(data));
  }
}
