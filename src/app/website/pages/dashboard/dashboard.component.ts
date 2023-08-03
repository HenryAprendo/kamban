import { Component, ChangeDetectorRef, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';

import { BoardService } from '../../../services/board.service';
import { Board } from '../../../model/board.model';
import { Task, TaskForm, SubTasks } from '../../../model/task.model';
import { Observable } from 'rxjs';
import { DialogInputDataComponent } from '../dialog-input-data/dialog-input-data.component';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { DragAndDrogComponent } from '../../components/drag-and-drog/drag-and-drog.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    DragAndDrogComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnDestroy {

  private defaultTitle = 'new title';

  mobileQuery: MediaQueryList;

  // Manejo del breakpoint
  private _mobileQueryListener: () => void;

  private boardService = inject(BoardService);

  actualBoard: Board|undefined;

  boardId:number = -1;

  nextId = 0;

  nextTaskId = 0;

  nextSubtaskId = 0;

  listBoard: Observable<Board[]> = this.boardService.arrayBoards$;

  constructor(changeDetectorRef:ChangeDetectorRef, media:MediaMatcher, public dialog:MatDialog){
    this.mobileQuery = media.matchMedia('(min-width:1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    this.boardService.actualBoard$
      .subscribe(b => this.actualBoard = b);
  }

  /**
   * Abre el cuadro de dialogo que permite crear un panel
   */
  openDialogAddBoard() {
    const dialogRef = this.dialog.open(DialogInputDataComponent,{
      data: {title: this.defaultTitle}
    });

    dialogRef.afterClosed().subscribe(newTitle => {
      if(newTitle !== undefined && newTitle.length > 0){
        const newBoard = this.newBoard(newTitle)
        this.boardService.addBoard(newBoard);
        this.boardId = newBoard.boardId;
      }
    })
  }

  /**
   * Abre el cuadro de dialogo que permite crear y agregar una tarea.
   */
  openDialogAddTask() {
    const dialogRef = this.dialog.open(DialogAddTaskComponent,{
      data: { }
    });

    dialogRef.afterClosed().subscribe((data:TaskForm) => {
      console.log(data)

      let subtasks: SubTasks[] = [];
      data.tasks.forEach(task => subtasks.push({
        id: this.nextSubtaskId++,
        description: task,
        done: false
      }));

      let newTask:Task = {
        taskId: this.nextTaskId++,
        title: data.title,
        description: data.description,
        subtasks: [...subtasks],
        status: data.status
      }

      // Solo se ejecutara el método en caso de que ya exista una panel creado
      if(this.actualBoard) this.boardService.addTask(this.boardId,newTask);

    });

  }

  private newBoard(title:string): Board {
    return {
      boardId: this.nextId++,
      title: title,
      listTodo: [],
      listDoing: [],
      listDone: []
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.addEventListener('change',this._mobileQueryListener);
  }

}












