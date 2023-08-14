import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private subject = new Subject<Task>();

  private taskObs$ = this.subject.asObservable();

  constructor() { }

  getTaskClicked(){
    return this.taskObs$;
  }

  emitTaskClicked(task:Task){
    this.subject.next(task);
  }

}
