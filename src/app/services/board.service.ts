import { Injectable, WritableSignal, signal } from '@angular/core';
import { Board } from '../model/board.model';
import { BehaviorSubject } from 'rxjs';
import { Task } from './../model/task.model';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boards:WritableSignal<Array<Board>> = signal([]);

  private arrayBoards = new BehaviorSubject(this.boards());
  arrayBoards$ = this.arrayBoards.asObservable();

  actualBoard = new BehaviorSubject<Board|undefined>(undefined);
  actualBoard$ = this.actualBoard.asObservable();

  constructor() {}

  addBoard(board:Board){
    const newBoards = this.boards();
    newBoards.push(board);
    this.boards.set(newBoards);

    this.notify(board);
  }

  addTask(boardId:number,task:Task){
    const data = this.boards();
    const index = data.findIndex(item => item.boardId === boardId);

    this.boards.mutate(value => {
      value[index].listTodo.push(task);
      this.notify(value[index]);
    });
  }

  private notify(board:Board){
    this.arrayBoards.next(this.boards());
    this.actualBoard.next(board);
  }

}





