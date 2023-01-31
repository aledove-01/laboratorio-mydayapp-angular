import { Component, Input } from '@angular/core';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task = new Task();

  editMode = false;
}
