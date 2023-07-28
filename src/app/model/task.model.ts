
enum States {
  Todo = 'TODO',
  Doing = 'DOING',
  Done = 'DONE'
}

interface SubTasks {
  [key:string]: string
}

export interface Task {
  taskId:number;
  title:string;
  description:string;
  subtasks:SubTasks
  status: States
}
