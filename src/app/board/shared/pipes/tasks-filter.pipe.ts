import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tasksFilter'
})
export class TasksFilterPipe implements PipeTransform {

  transform(items: Array<any>, list: any): Array<any> {
    if (!items) {
      return;
    }

    return items.filter(item => item.listId === list.id);
  }
}
