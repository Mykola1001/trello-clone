import { Component, Input, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { Task } from '../../models/task';
import { ListState } from '../../store/reducers/list.reducer';
import { Store } from '@ngrx/store';
import { DeleteList, EditList } from '../../store/actions/list.action';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { AddTask, DragAndDropTask } from '../../store/actions/task.action';
import { BoardService } from '../../services/board.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() list: List;
  @Input() tasks$: Task[];
  // isInlineEdit for editing in place
  isInlineEdit = false;
  isInlineAddTask = false;
  editListData;
  taskData;
  ids;
  deleteConfirmDialogRef: MatDialogRef<DeleteConfirmDialogComponent>;
  constructor(private store: Store<ListState>, public dialog: MatDialog, private service: BoardService) { }

  ngOnInit() {
    this.ids = this.service.listIds;
  }

  inlineEdit() {
    this.isInlineEdit = true;
  }

  inlineAddTask() {
    this.isInlineAddTask = this.isInlineAddTask === false;
  }

  editList (id: string, data) {
    this.editListData = new List();
    this.editListData.id = id;
    if (!data.value) {
      data.value = 'Unnamed list';
    }
    this.editListData.name = data.value;
    this.isInlineEdit = false;
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
