import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  lists: List[];
  constructor() { }

  addList(list: List): Observable<boolean> {
    this.lists = JSON.parse(localStorage.getItem('lists')) || [];
    // add generated ID
    list.id = this.idGenerator();
    this.lists.push(list);
    localStorage.setItem('lists', JSON.stringify(this.lists));

    return of(true);
  }

  editList(list: List): Observable<boolean> {
    this.lists = JSON.parse(localStorage.getItem('lists'));
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === list.id) {
        this.lists[i].name = list.name;
        localStorage.setItem('lists', JSON.stringify(this.lists));
      }
    }

    return of(true);
  }

  deleteItem(list: List): Observable<boolean> {
    this.lists = JSON.parse(localStorage.getItem('lists'));
    // delete List
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === list.id) {
        this.lists.splice(i, 1);
        localStorage.setItem('lists', JSON.stringify(this.lists));
      }
    }

    return of(true);
  }

  getAllLists(): Observable<any> {
    return of(JSON.parse(localStorage.getItem('lists')));
  }

  idGenerator(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
