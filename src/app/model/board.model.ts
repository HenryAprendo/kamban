import { Task } from './task.model';

export interface Board {
  boardId:number;
  title: string;
  listTodo: Task[];
  listDoing: Task[];
  listDone: Task[];
}
