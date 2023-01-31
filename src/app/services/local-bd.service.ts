import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class LocalBDService {

  private key = 'mydayapp-angular';


  public saveData(tasks: Task[]) {
    if (tasks){
      localStorage.setItem(this.key, JSON.stringify(tasks));
    }else{
      throw new Error("Not especified tasks");
    }
  }

  public getData():Task[] {
    const localData:string | null = localStorage.getItem(this.key);
    if (localData){
      return JSON.parse(localData) as Task[];
    }
    return [] 
  }
  public removeData() {
    localStorage.removeItem(this.key)
  }

  public clearData() {
  localStorage.clear( )  
  }
}
