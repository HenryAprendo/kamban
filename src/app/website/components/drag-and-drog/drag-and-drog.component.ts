import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropListGroup } from '@angular/cdk/drag-drop';

import { SubTasks, Task } from '../../../model/task.model';
import { Board } from '../../../model/board.model';

@Component({
  selector: 'app-drag-and-drog',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList, CdkDropListGroup, MatCardModule],
  templateUrl: './drag-and-drog.component.html',
  styleUrls: ['./drag-and-drog.component.scss']
})
export class DragAndDrogComponent {

  @Input({required:true}) board!: Board;

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
  };

  numberSubstasksDone(subtasks:SubTasks[]){
    const taskDone = subtasks.filter(item => item.done === true);
    const result = `${taskDone.length} of ${subtasks.length} substasks`;
    return result;
  }

}
