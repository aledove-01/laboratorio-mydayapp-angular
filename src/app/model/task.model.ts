import * as e from 'cors';

export class Todo {
  id = '';
  title = '';
  completed = false;
  isEditing = false;

  constructor(_title: string) {
    this.id = '';
    this.title = _title;
    this.completed = false;
  }
}
