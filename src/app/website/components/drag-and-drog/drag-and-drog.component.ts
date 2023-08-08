import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Task } from '../../../model/task.model';
import { Board } from '../../../model/board.model';
import { DropListComponent } from '../drop-list/drop-list.component';

@Component({
  selector: 'app-drag-and-drog',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, DropListComponent],
  templateUrl: './drag-and-drog.component.html',
  styleUrls: ['./drag-and-drog.component.scss']
})
export class DragAndDrogComponent {

  @Input({required:true}) board!: Board;

  @Output() moveItems = new EventEmitter();

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
        this.moveItems.emit();
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
        );
        this.moveItems.emit();
    }

  };

}

