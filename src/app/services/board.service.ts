import { Injectable, WritableSignal, signal } from '@angular/core';
import { Board } from '../model/board.model';
import { BehaviorSubject } from 'rxjs';
import { States, Task } from './../model/task.model';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  // Lista de paneles de tareas
  private boards:WritableSignal<Array<Board>> = signal([]);
  private arrayBoards = new BehaviorSubject(this.boards());
  arrayBoards$ = this.arrayBoards.asObservable();

  // Panel actual sobre el que se esta trabajando
  private actualBoard = new BehaviorSubject<Board|undefined>(undefined);
  actualBoard$ = this.actualBoard.asObservable();

  constructor() {}

  /**
   * Método que crea una nueva board y la agrega a la lista.
   *
   * @param board objeto del tipo Board
   */
  addBoard(board:Board){
    const newBoards = this.boards();
    newBoards.push(board);
    this.boards.set(newBoards);

    this.notify(board);
  }

  /**
   * Método que agrega una tarea del tipo Task a una de las lista de un objeto board, según el estado
   * de la tarea.
   *
   * @param boardId id de la board a la que se agregara la tarea.
   * @param task nueva tarea del tipo Task para ser agregada.
   */
  addTask(boardId:number,task:Task){

    const index = this.getPositionIndex(boardId);
    this.boards.mutate(value => {

      switch(task.status){
        case 'TODO': {
          value[index].listTodo.push(task);
          break;
        }
        case 'DOING': {
          value[index].listDoing.push(task);
          break;
        }
        case 'DONE': {
          value[index].listDone.push(task);
          break;
        }
      }

      this.notify(value[index]);
    });
  }

  /**
   * Método que actualiza la board actual cuando hay movimientos drag and drog en los contenedores de tareas.
   *
   * @param boardId id de la board a la que se agregara la tarea.
   * @param board objeto del tipo Board con el nuevo contenido que ha sido modificado y que necesita ser actualizado en la lista de board, para que coincida con lo que se muestra en pantalla.
   *
  */
  updateBoard(boardId:number, board:Board){
    const index = this.getPositionIndex(boardId);
    this.boards.mutate(value => {
      value[index] = board;
    });

    this.notify(board);
  }

  /**
   * Actualiza una tarea y la board en la que se encuentra a nivel de toda la aplicación.
   *
   * @param boardId identificador de la board
   * @param task tarea actual en la que se han registrado avances del proceso
   * @param previusTaskStatus estatus anterior de la tarea que sirve para identificar el contenedor en que estaba
   */
  updateTaskOfBoard(boardId:number, task:Task, previusTaskStatus:States){

    const indexPosition = this.getPositionIndex(boardId);
    const board = this.boards()[indexPosition];

    let status = task.status;
    let id = task.taskId;
    let index = 0;

    if(previusTaskStatus !== status){

      // cambia de contenedor
      switch(status){
        case 'TODO': {
          board.listTodo.push({...task});
          break;
        }
        case 'DOING': {
          board.listDoing.push({...task});
          break;
        }
        case 'DONE': {
          board.listDone.push({...task});
          break;
        }
      }

      //elimina del contenedor
      switch(previusTaskStatus){
        case 'TODO': {
          this.deleteTaskOfArray(board.listTodo,id);
          break;
        }
        case 'DOING': {
          this.deleteTaskOfArray(board.listDoing,id);
          break;
        }
        case 'DONE': {
          this.deleteTaskOfArray(board.listDone,id);
          break;
        }
      }

    }
    else {
      switch(status){
        case 'TODO': {
          this.updateChangeOfTask(board.listTodo,task);
          break;
        }
        case 'DOING': {
          this.updateChangeOfTask(board.listDoing,task);
          break;
        }
        case 'DONE': {
          this.updateChangeOfTask(board.listDone,task);
          break;
        }
      }

    }

    this.updateBoard(boardId,board);
  }

  /**
   * Método que notifica a los observables un cambio de estado en la board actual,
   * para que los suscriptores se actualizen con los nuevos estados.
   *
   * @param board objeto board con nuevos cambios.
   */
  private notify(board:Board){
    this.arrayBoards.next(this.boards());
    this.actualBoard.next(board);
  }

  /**
   * Obtiene por medio del id, la posición en el arreglo.
   * @param boardId id de la board
   * @returns el index de la posición en el arreglo del tipo signal
   */
  private getPositionIndex(boardId:number) {
    return this.boards().findIndex(item => item.boardId === boardId);
  }

  /**
   *  Obtiene por medio del id la posición en el arreglo
   *
   * @param arr lista
   * @param id identificador de la tarea
   * @returns el index de la posición en el arreglo
   */
  private getPositionIndexOfArray(arr:Task[], id:number){
    return arr.findIndex(item => item.taskId === id);
  }

  /**
   * Elimina una tarea del contenedor previo al haber cambiado de contenedor por el estado
   *
   * @param tasks arreglo de tareas
   * @param id identificador de la tarea actual
   */
  private deleteTaskOfArray(tasks:Task[], id:number){
    let index = this.getPositionIndexOfArray(tasks, id);
    tasks.splice(index);
  }


  /**
   * Actualiza la tarea actual cuando han cambiado el estado de sus subtareas
   *
   * @param tasks arreglo de tareas
   * @param task tarea actual que ha sido modificada
   */
  private updateChangeOfTask(tasks:Task[], task:Task){
    let index = this.getPositionIndexOfArray(tasks, task.taskId);
    tasks[index] = {...task};
  }

}

















