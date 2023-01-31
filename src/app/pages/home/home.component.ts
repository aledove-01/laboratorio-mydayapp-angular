import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  txtTodo = '';
  countTasks=0;
  newTask:Task | undefined;

  ngOnInit(): void {
    console.log('init1')
  }
  updateTasks(count:number){
    console.log('updatecountertask')
    this.countTasks = count;
  }
  pressEnter(){
    const txt:string = this.txtTodo;
    if(txt.trim() != ''){
      if (this.countTasks == 0) {
        this.countTasks = 1;
      }
      console.log('enter ' +this.txtTodo)
      this.newTask = {id:'',title:this.txtTodo,completed:false};
      this.txtTodo = '';
    }
    
  }
}
