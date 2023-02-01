import { Injectable } from '@angular/core';
import { Todo } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class LocalBDService {
  private key = 'mydayapp-angular';

  constructor() {
    console.log('constructor serv');
  }

  public saveData(tasks: Todo[]) {
    if (tasks) {
      localStorage.setItem(this.key, JSON.stringify(tasks));
    } else {
      throw new Error('Not especified tasks');
    }
  }

  public getData(): Todo[] {
    const localData: string | null = localStorage.getItem(this.key);
    if (localData) {
      return JSON.parse(localData) as Todo[];
    }
    return [];
  }
  public removeData() {
    localStorage.removeItem(this.key);
  }

  public clearData() {
    localStorage.clear();
  }
}
