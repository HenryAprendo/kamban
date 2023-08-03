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
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropListGroup } from '@angular/cdk/drag-drop';

import { BoardService } from '../../../services/board.service';
import { Board } from '../../../model/board.model';
import { Task, CreateTaskDTO, TaskForm, States, SubTasks } from '../../../model/task.model';
import { Observable } from 'rxjs';
import { DialogInputDataComponent } from '../dialog-input-data/dialog-input-data.component';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';

import { ContainerDrapComponent } from '../../components/container-drap/container-drap.component';
import { CardDragComponent } from '../../components/card-drag/card-drag.component';
import { CardListComponent } from '../../components/card-list/card-list.component';

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
    MatDialogModule,
    CdkDropListGroup,
    ContainerDrapComponent,
    CardDragComponent,
    CardListComponent
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

  /**
   * Actualiza cada contenedor cuando se han movido las tareas dentro del mismo array o cuando se han pasado a otro contenedor habilitado.
   * @param event tiene información acerca de como se han movido las tareas dentro de los contenedores.
   */
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












