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
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

import { BoardService } from './../../../services/board.service';
import { Board } from './../../../model/board.model';
import { Task, States, SubTasks } from './../../../model/task.model';
import { Observable } from 'rxjs';
import { DialogInputDataComponent } from '../dialog-input-data/dialog-input-data.component';


const testBoard:Board = {
  boardId: 0,
  title: 'my-board',
  listTodo: [
    {
      taskId: 0,
      title: 'Pagar nomina uno',
      description: 'Se debe obtnener las nominas y entregar a recursos humanos',
      status: States.Todo,
      subtasks: [{
        id: 0,
        description: 'buscar nomina',
        done: true
      },
      {
        id: 0,
        description: 'imprimir nomina',
        done: true
      },
      {
        id: 0,
        description: 'buscar nomina',
        done: false
      } ]
    },
    {
      taskId: 1,
      title: 'Pagar nomina dos',
      description: 'Se debe obtnener las nominas y entregar a recursos humanos',
      status: States.Todo,
      subtasks: [{
        id: 0,
        description: 'buscar nomina',
        done: false
      },
      {
        id: 0,
        description: 'imprimir nomina',
        done: false
      },
      {
        id: 0,
        description: 'buscar nomina',
        done: false
      }]
    }
  ],
  listDoing: [
    {
      taskId: 0,
      title: 'Pagar nomina dos',
      description: 'Se debe obtnener las nominas y entregar a recursos humanos',
      status: States.Doing,
      subtasks: [{
        id: 0,
        description: 'buscar nomina',
        done: false
      },
      {
        id: 0,
        description: 'imprimir nomina',
        done: false
      },
      {
        id: 0,
        description: 'buscar nomina',
        done: false
      }]
    },
    {
      taskId: 1,
      title: 'Pagar nomina tres',
      description: 'Se debe obtnener las nominas y entregar a recursos humanos',
      status: States.Doing,
      subtasks: [{
        id: 0,
        description: 'buscar nomina',
        done: false
      },
      {
        id: 0,
        description: 'imprimir nomina',
        done: false
      },
      {
        id: 0,
        description: 'buscar nomina',
        done: false
      }]
    }
  ],
  listDone: [
    {
      taskId: 0,
      title: 'Pagar nomina cuatro',
      description: 'Se debe obtnener las nominas y entregar a recursos humanos',
      status: States.Done,
      subtasks: [{
        id: 0,
        description: 'buscar nomina',
        done: false
      },
      {
        id: 0,
        description: 'imprimir nomina',
        done: false
      },
      {
        id: 0,
        description: 'buscar nomina',
        done: false
      }]
    },
    {
      taskId: 1,
      title: 'Pagar nomina cinco',
      description: 'Se debe obtnener las nominas y entregar a recursos humanos',
      status: States.Done,
      subtasks: [{
        id: 0,
        description: 'buscar nomina',
        done: false
      },
      {
        id: 0,
        description: 'imprimir nomina',
        done: false
      },
      {
        id: 0,
        description: 'buscar nomina',
        done: false
      }]
    }
  ]
}


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
    MatCardModule,
    MatDialogModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnDestroy {

  private defaultTitle = 'new title';

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  private boardService = inject(BoardService);

  actualBoard:Board | undefined = testBoard;

  nextId = -1;

  listBoard: Observable<Board[]> = this.boardService.arrayBoards$;

  constructor(changeDetectorRef:ChangeDetectorRef, media:MediaMatcher, public dialog:MatDialog){
    this.mobileQuery = media.matchMedia('(min-width:1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogInputDataComponent,{
      data: {title: this.defaultTitle}
    });

    dialogRef.afterClosed().subscribe(newTitle => {
      if(newTitle !== undefined && newTitle.length > 0){
        const newBoard = this.newBoard(newTitle)
        this.boardService.addBoard(newBoard);
        this.actualBoard = newBoard;
      }
    })
  }

  drop(event:CdkDragDrop<Task[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  numberSubstasksDone(subtasks:SubTasks[]){
    const taskDone = subtasks.filter(item => item.done === true);
    const result = `${taskDone.length} of ${subtasks.length} substasks`;
    return result;
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












