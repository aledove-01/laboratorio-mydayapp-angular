import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  @Input() task:Task = new Task();

  //task:Task = new Task();
  editMode:boolean = false;

  constructor(private el: ElementRef) { 
    //this.task = new Task();
    this.el.nativeElement.class = 'iolet'; 
  }

  ngOnInit(): void {
    console.log('task', this.task);
  }

   
}
