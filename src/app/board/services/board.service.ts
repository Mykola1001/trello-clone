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
    list.tasks = [];
    this.lists.push(list);
    localStorage.setItem('lists', JSON.stringify(this.lists));

    return of(true);
  }

  addTask(task: Task): Observable<boolean> {
    this.lists = JSON.parse(localStorage.getItem('lists')) || [];
    // add generated ID
    task.id = this.idGenerator();
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === task.listId) {
        this.lists[i].tasks.push(task);
        localStorage.setItem('lists', JSON.stringify(this.lists));
      }
    }

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
    this.lists = JSON.parse(localStorage.getItem('lists'));
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === task.listId) {
        this.tasks = [...this.lists[i].tasks];
        for (let j = 0; j < this.tasks.length; j ++) {
          if (this.tasks[j].id === task.id) {
            this.tasks[j].name = task.name;
            this.tasks[j].description = task.description;
          }
        }
        this.lists[i].tasks = [...this.tasks];
      }
    }
    localStorage.setItem('lists', JSON.stringify(this.lists));

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

  deleteTask(task: Task): Observable<boolean> {
    this.lists = JSON.parse(localStorage.getItem('lists'));
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === task.listId) {
        this.tasks = [...this.lists[i].tasks];
        for (let j = 0; j < this.tasks.length; j ++) {
          if (this.tasks[j].id === task.id) {
            this.tasks.splice(j, 1);
          }
        }
        this.lists[i].tasks = [...this.tasks];
      }
    }
    localStorage.setItem('lists', JSON.stringify(this.lists));

    return of(true);
  }

  // drag and drop task
  dragAndDropTask(data: any): Observable<boolean> {
    this.lists = JSON.parse(localStorage.getItem('lists'));
    // drag and drop task to the same list
    if (data['prevListId'] === data['nextListId']) {
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].id === data['prevListId']) {
          // add to temp array all tasks from list
          this.tasks = this.lists[i].tasks;
          const draggableTask = this.tasks[data['prevIndex']];
          // move task at new position
          this.tasks.splice(data['prevIndex'], 1);
          this.tasks.splice(data['nextIndex'], 0, draggableTask);
          this.lists[i].tasks = this.tasks;
        }
      }
      localStorage.setItem('lists', JSON.stringify(this.lists));
    } else { // drag and drop task to other list
      // delete task from previous list
      let draggableTask;
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].id === data['prevListId']) {
          this.tasks = this.lists[i].tasks;
          draggableTask = this.tasks[data['prevIndex']];
          this.tasks.splice(data['prevIndex'], 1);
          this.lists[i].tasks = this.tasks;
          localStorage.setItem('lists', JSON.stringify(this.lists));
        }
      }
      // add task at new position in other List
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].id === data['nextListId']) {
          this.tasks = this.lists[i].tasks;
          draggableTask.listId = data['nextListId'];
          this.tasks.splice(data['nextIndex'], 0, draggableTask);
          this.lists[i].tasks = this.tasks;
          localStorage.setItem('lists', JSON.stringify(this.lists));
        }
      }
    }

    return of(true);
  }

  getAllLists(): Observable<any> {
    return of(JSON.parse(localStorage.getItem('lists')));
  }

  getAllTasks(): Observable<any> {
    this.tasks = [];
    this.lists = JSON.parse(localStorage.getItem('lists'));
    if (!this.lists) {
      this.lists = [];
    }
    for (let i = 0; i < this.lists.length; i++) {
      for (let j = 0; j < this.lists[i].tasks.length; j++) {
        this.tasks.push(this.lists[i].tasks[j]);
      }
    }

    return of (this.tasks);
  }

  idGenerator(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
