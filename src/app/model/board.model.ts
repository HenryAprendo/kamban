import { Task } from './task.model';

export interface Board {
  boardId:number;
  title: string;
  listTodo: Task[];
  listDoing: Task[];
  listDone: Task[];
}

export interface CreateBoardDTO extends Omit<Board, 'boardId'> { };

export interface UpdateBoard {
  task:Task;
  boardId:number;
}
