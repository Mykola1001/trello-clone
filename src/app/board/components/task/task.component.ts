import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TaskState } from '../../store/reducers/task.reducer';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { DeleteTask } from '../../store/actions/task.action';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  deleteConfirmDialogRef: MatDialogRef<DeleteConfirmDialogComponent>;
  constructor(private store: Store<TaskState>, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(task: Task): void {
    this.deleteConfirmDialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    this.deleteConfirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteTask(task));
      }
      this.deleteConfirmDialogRef = null;
    });
  }
}
