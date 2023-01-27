import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges {
  @Output() countTasks = new EventEmitter<number>()
  @Input() newTask:Task | undefined;
  counterTask = 0;
  tasks:Task[];
  
  constructor() { 
     this.tasks = [];
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('new task!');
      if(changes['newTask']){
        
        if (typeof(this.newTask) == 'object' )
          this.addTask(this.newTask);
      }
  }

  addTask(task:Task) {
    this.tasks?.push(task);
    this.counterTask++;
    this.countTasks.emit(this.counterTask);
  }

  
  ngOnInit(): void {
    console.log('tasks', this.tasks)

  }

}
