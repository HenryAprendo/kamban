import { Board } from "../../model/board.model";
import { States, SubTasks, Task } from "../../model/task.model";

export const numberSubstasksDone = (subtasks:SubTasks[]) => {
  const taskDone = subtasks.filter(item => item.done === true);
  const result = `${taskDone.length} of ${subtasks.length} substasks`;
  return result;
}

export const getDefaultTask = () => {
  let task:Task = {
    taskId: 0,
    title: '',
    description: '',
    subtasks: [],
    status: States.Todo
  }

  return task;
}

export const getDefaultBoard = () => {
  let board:Board = {
    boardId: 0,
    title: "",
    listTodo: [],
    listDoing: [],
    listDone: []
  }
  return board;
}
