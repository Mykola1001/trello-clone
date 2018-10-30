import { Component, Input, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { ListState } from '../../store/reducers/list.reducer';
import { Store } from '@ngrx/store';
import { DeleteList, EditList } from '../../store/actions/list.action';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() list: List;
  // isInlineEdit for editing in place
  isInlineEdit = false;
  editListData;
  deleteConfirmDialogRef: MatDialogRef<DeleteConfirmDialogComponent>;
  constructor(private store: Store<ListState>, public dialog: MatDialog) { }

  ngOnInit() {
  }

  inlineEdit() {
    this.isInlineEdit = true;
  }

  editList (id: string, data) {
    this.editListData = new List();
    this.editListData.id = id;
    this.editListData.name = data.value;
    this.isInlineEdit = false;
    this.store.dispatch(new EditList(this.editListData));
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
}
