
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { BoardComponent } from './components/board/board.component';
import { BoardService } from './services/board.service';
import { reducers } from './store';
import { ListEffects, TaskEffects } from './store/effects/index';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ListsComponent } from './containers/lists/lists.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './components/task/task.component';
import { TasksFilterPipe } from './shared/pipes/tasks-filter.pipe';
import { EditFormDialogComponent } from './components/edit-form-dialog/edit-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('board', reducers),
    EffectsModule.forFeature([ListEffects, TaskEffects]),
  ],
  entryComponents: [DeleteConfirmDialogComponent, EditFormDialogComponent],
  declarations: [BoardComponent, ListsComponent, ListItemComponent,
    DeleteConfirmDialogComponent, TaskComponent, TasksFilterPipe, EditFormDialogComponent],
  exports: [BoardComponent],
  providers: [BoardService]
})

export class BoardModule {
}
