import { Injectable, WritableSignal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Board } from '../model/board.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boards:WritableSignal<Array<Board>> = signal([]);

  private arrayBoards = new BehaviorSubject(this.boards());

  arrayBoards$ = this.arrayBoards.asObservable();

  constructor() {

  }

  addBoard(board:Board){
    const newBoards = this.boards();
    newBoards.push(board);
    this.boards.set(newBoards);
    this.arrayBoards.next(this.boards());
  }



}

