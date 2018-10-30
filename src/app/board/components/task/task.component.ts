import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TaskState } from '../../store/reducers/task.reducer';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { DeleteTask } from '../../store/actions/task.action';
import { EditFormDialogComponent } from '../edit-form-dialog/edit-form-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  deleteConfirmDialogRef: MatDialogRef<DeleteConfirmDialogComponent>;
  editTaskDialogRef: MatDialogRef<EditFormDialogComponent>;
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

  editDialog(task: Task) {
    this.editTaskDialogRef = this.dialog.open(EditFormDialogComponent, {
      data: task,
      width: '500px'
    });
  }
}
