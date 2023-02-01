import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Todo } from '../../model/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Todo = new Todo('');
  //@Output() updateTask = new EventEmitter<Todo>();
  @Output() isEditing = new EventEmitter<Todo>();
  txtTodo = '';
  @ViewChild('editInput', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
      element.nativeElement.select();
    }
  }
  constructor(private tasksService: TasksService) {}

  completed() {
    this.task.completed = !this.task.completed;
    this.tasksService.editTask(this.task);
    // this.updateTask.emit(this.task);
  }
  destroy() {
    console.log('del task1');
    this.tasksService.delTask(this.task);
  }
  edit() {
    this.task.isEditing = true;
    this.txtTodo = this.task.title;
    this.isEditing.emit(this.task);
  }
  cancelEdit() {
    console.log('cancel edit');
    this.task.isEditing = false;
    this.isEditing.emit(this.task);
  }
  okEdit() {
    console.log('ok edit');
    this.txtTodo = this.txtTodo.trim();
    if (this.txtTodo != '') {
      this.task.isEditing = false;
      this.task.title = this.txtTodo;
      this.isEditing.emit(this.task);
      //this.updateTask.emit(this.task);
      this.tasksService.editTask(this.task);
    }
  }
}
