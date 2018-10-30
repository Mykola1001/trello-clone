import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../models/list';
import { select, Store } from '@ngrx/store';
import { ListState } from '../../store/reducers/list.reducer';
import { AddList, GetAllLists } from '../../store/actions/list.action';
import * as fromListSelectors from '../../store/selectors/list.selector';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists$: Observable<List[]>;
  newList;
  constructor(private store: Store<ListState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetAllLists());
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
