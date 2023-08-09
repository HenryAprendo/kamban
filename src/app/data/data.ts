import { Status } from '../model/data.model';
import { States } from '../model/task.model';

export const STATUS: Array<Status> = [
  {value: States.Todo, valueView: 'Todo'},
  {value: States.Doing, valueView: 'Doing'},
  {value: States.Done, valueView: 'Done'}
];
