import { Injectable, WritableSignal, signal } from '@angular/core';
import { Board } from '../model/board.model';
import { BehaviorSubject } from 'rxjs';
import { Task } from './../model/task.model';

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

  updateTaskOfBoard(boardId:number,task:Task){
    const index = this.getPositionIndex(boardId);
    const board = this.boards()[index];

    switch(task.status){
      case 'TODO': {
        let taskPositionIndex = board.listTodo.findIndex(item => item.taskId === task.taskId);
        board.listTodo[taskPositionIndex] = {...task};
        break;
      }
      case 'DOING': {
        let taskPositionIndex = board.listDoing.findIndex(item => item.taskId === task.taskId);
        board.listDoing[taskPositionIndex] = {...task};
        break;
      }
      case 'DONE': {
        let taskPositionIndex = board.listDone.findIndex(item => item.taskId === task.taskId);
        board.listDone[taskPositionIndex] = {...task};
        break;
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

}












