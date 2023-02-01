import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Todo } from '../../model/task.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() countTasks = 0;
  state = 'all';
  existPendingTask = false;
  existCompletedTask = false;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe(params => {
      if (params[0]) this.state = params[0].path;
      else this.state = 'all';
    });
    this.tasksService._tasks.subscribe(value => {
      this.updateComponentTemplate(value);
    });
    this.updateComponentTemplate([]);
  }

  private updateComponentTemplate(tasks: Todo[]) {
    let taskTmp = [];
    if (tasks.length > 0) {
      taskTmp = tasks;
    } else {
      taskTmp = this.tasksService.getTask(this.state);
    }

    this.existPendingTask = false;
    this.existCompletedTask = false;
    taskTmp.forEach(task => {
      if (task.completed) {
        this.existCompletedTask = true;
      } else {
        this.existPendingTask = true;
      }
    });
  }

  clearCompleted() {
    this.tasksService.clearCompleted();
  }
}

/*import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Todo } from '../../model/task.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @Input() countTasks = 0;
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}
  state = 'all';
  existPendisgTask = false;
  existCompletedTask = false;
  ngOnInit() {
    this.route.url.subscribe(params => {
      if (params[0]) this.state = params[0].path;
      else this.state = 'all';
    });
    this.tasksService._tasks.subscribe(value => {
      this.updateTemplate(value);
    });
    this.updateTemplate([]);
  }

  private updateTemplate(value: Todo[]) {
    let task;
    if (value.length > 0) {
      task = value;
    } else {
      task = this.tasksService.getTask(this.state);
    }
    console.log('fsfssfdfsdfsdfsd', task);
    task.forEach(tks => {
      if (tks.completed) this.existCompletedTask = true;
      else this.existPendisgTask = true;
    });
  }
  clearCompleted() {
    this.tasksService.clearCompleted();
  }
}
*/
