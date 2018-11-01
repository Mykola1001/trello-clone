import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskState } from '../../store/reducers/task.reducer';
import { Store } from '@ngrx/store';
import { EditTask } from '../../store/actions/task.action';

@Component({
  selector: 'app-edit-form-dialog',
  templateUrl: './edit-form-dialog.component.html',
  styleUrls: ['./edit-form-dialog.component.css']
})
export class EditFormDialogComponent implements OnInit {
  public editForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<EditFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder, private store: Store<TaskState>) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      listId: [this.data.listId],
      id: [this.data.id],
      name: [ this.data.name ],
      description: [ this.data.description]
    });
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  editTask() {
    this.store.dispatch(new EditTask(this.editForm.value));
    this.dialogRef.close();
  }
}
