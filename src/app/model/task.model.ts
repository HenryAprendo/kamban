
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

export interface CreateTaskDTO extends Omit<Task,'taskId'>{};

export interface TaskForm extends Omit<Task,'taskId'|'subtasks'>{
  tasks:string[];
}


export interface UpdateTask {
  status: States;
  subtasks: boolean[];
}





