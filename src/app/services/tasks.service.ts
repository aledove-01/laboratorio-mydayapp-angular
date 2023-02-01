import { Injectable } from '@angular/core';
import { LocalBDService } from './local-bd.service';
import { Todo } from '../model/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Todo[] = [];
  _tasks = new Subject<Todo[]>();
  _counterTask = new Subject<number>();

  constructor(private localBDService: LocalBDService) {
    this.tasks = this.localBDService.getData();
    this._tasks.next(this.tasks);
    this._counterTask.next(this.countTaskLeft());
    console.log('init tasks: ', this.tasks, this.countTaskLeft());
  }

  getTask(state: string = 'all') {
    console.log('change state list task', state);
    this.tasks = this.localBDService.getData();
    if (state === 'completed') {
      this.tasks = this.tasks.filter(t => {
        if (t.completed) return t;
        return undefined;
      });
    } else if (state === 'pending') {
      this.tasks = this.tasks.filter(t => {
        if (!t.completed) return t;
        return undefined;
      });
    } else {
      this.tasks = this.tasks;
    }
    //this._tasks.next(this.tasks);
    this._counterTask.next(this.countTaskLeft());
    console.log('load', this.tasks);
    return this.tasks;
  }

  saveTasks() {
    this.localBDService.saveData(this.tasks);
    this._tasks.next(this.tasks);
    this._counterTask.next(this.countTaskLeft());
  }
  addTask(task: Todo) {
    this.tasks = this.localBDService.getData();
    task.id = this.tasks.length.toString();
    this.tasks?.push(task);
    this.saveTasks();
  }
  editTask(task: Todo) {
    this.tasks = this.localBDService.getData();
    let indexTmp = this.tasks.findIndex(t => t.id === task.id);
    console.log('edit index ', indexTmp);
    this.tasks[indexTmp] = task;
    this.saveTasks();
  }
  delTask(task: Todo) {
    this.deleteTask(task);
    console.log('after delete task count:', this.tasks.length);
    this.saveTasks();
    this._counterTask.next(this.countTaskLeft());
  }
  private deleteTask(task: Todo) {
    let index = this.tasks.indexOf(task);
    this.tasks?.splice(index, 1);
  }
  countTaskLeft() {
    let tmpTasks = this.localBDService.getData();
    let tasksPending = tmpTasks.filter(t => !t.completed);

    return tasksPending.length;
  }
  clearCompleted() {
    this.tasks = this.localBDService.getData();
    console.log('this.tasks clear', this.tasks);
    this.tasks.forEach(tsk => {
      if (tsk.completed) {
        console.log('this.tasks clear del', tsk);
        this.deleteTask(tsk);
      }
    });
    this.saveTasks();
  }
}
