
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { BoardComponent } from './components/board/board.component';
import { BoardService } from './services/board.service';
import { reducers } from './store';
import { ListEffects } from './store/effects/index';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ListsComponent } from './containers/lists/lists.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('board', reducers),
    EffectsModule.forFeature([ListEffects]),
  ],
  entryComponents: [DeleteConfirmDialogComponent],
  declarations: [BoardComponent, ListsComponent, ListItemComponent, DeleteConfirmDialogComponent],
  exports: [BoardComponent],
  providers: [BoardService]
})

export class BoardModule {
}
