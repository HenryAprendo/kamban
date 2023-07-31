
export enum States {
  Todo = 'TODO',
  Doing = 'DOING',
  Done = 'DONE'
}

export interface SubTasks {
  id:number;
  description:string;
  done:boolean;
}

export interface Task {
  taskId:number;
  title:string;
  description:string;
  subtasks: SubTasks[];
  status: States;
}
