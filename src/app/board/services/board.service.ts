import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { List } from '../models/list';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  lists: List[];
  tasks: Task[];
  constructor() { }

  addList(list: List): Observable<boolean> {
    this.lists = JSON.parse(localStorage.getItem('lists')) || [];
    // add generated ID
    list.id = this.idGenerator();
    this.lists.push(list);
    localStorage.setItem('lists', JSON.stringify(this.lists));

    return of(true);
  }

  addTask(task: Task): Observable<boolean> {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // add generated ID
    task.id = this.idGenerator();
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

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

  editTask(task: Task): Observable<boolean> {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === task.id) {
        this.tasks[i].name = task.name;
        this.tasks[i].description = task.description;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }

    return of(true);
  }

  deleteItem(list: List): Observable<boolean> {
    this.lists = JSON.parse(localStorage.getItem('lists'));
    this.tasks = JSON.parse(localStorage.getItem('tasks'));

    // delete tasks of List
    for (let j = this.tasks.length - 1; j > -1; j--) {
      if (list.id === this.tasks[j].listId) {
        this.tasks.splice(j, 1);
      }
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    // delete List
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === list.id) {
        this.lists.splice(i, 1);
        localStorage.setItem('lists', JSON.stringify(this.lists));
      }
    }

    return of(true);
  }

  deleteTask(task: Task): Observable<boolean> {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === task.id) {
        this.tasks.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }

    return of(true);
  }

  getAllLists(): Observable<any> {
    return of(JSON.parse(localStorage.getItem('lists')));
  }

  getAllTasks(): Observable<any> {
    return of(JSON.parse(localStorage.getItem('tasks')));
  }

  idGenerator(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
