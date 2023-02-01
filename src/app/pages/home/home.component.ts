import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Todo } from '../../model/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  txtTodo = '';
  countTasks = 0;
  countTasksTotal = 0;
  newTask: Todo | undefined;
  tasks: Todo[] = [];
  state = '';

  /*updateTask(task: Todo) {
    this.tasksService.saveTasks();
    this.tasks = this.tasksService.getTask(this.state);
  }*/
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(params => {
      if (params[0]) this.state = params[0].path;
      else this.state = 'all';
      // this.tasksService.getTask(this.state);
      console.log('esta en home', this.state);
    });

    this.countTasks = this.tasksService.countTaskLeft();
    //this.tasks = this.tasksService.getTask(this.state);

    this.tasksService._counterTask.subscribe(value => {
      console.log('task counter', value);
      this.countTasks = value;
    });
    this.tasksService._tasks.subscribe(value => {
      this.tasks = value;
      console.log('suscribe', value);
    });
    this.tasks = this.tasksService.getTask(this.state);
  }

  updateTasks(count: number) {
    console.log('updatecountertask');
    this.countTasks = count;
  }
  pressEnter() {
    const txt: string = this.txtTodo;
    if (txt.trim() != '') {
      if (this.countTasks == 0) {
        this.countTasks = 1;
      }
      console.log('enter ' + this.txtTodo);
      this.newTask = new Todo(this.txtTodo); //{ id: '', title: this.txtTodo, completed: false };
      this.txtTodo = '';
      this.tasksService.addTask(this.newTask);
      this.tasks = this.tasksService.getTask(this.state);
    }
  }
  isEditing(task: Todo) {
    console.log(task.isEditing);
  }
}
