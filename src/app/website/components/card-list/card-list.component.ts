import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '../../../model/task.model';
import { CardDragComponent } from './../../components/card-drag/card-drag.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, CardDragComponent],
  templateUrl: './card-list.component.html',
  styles: [
  ]
})
export class CardListComponent {

  @Input({required:true}) taskList:Task[] = [];

  @Output() eventCdkDragDrog = new EventEmitter();

  drop(event:CdkDragDrop<Task[]>){
    this.eventCdkDragDrog.emit(event);
  }

}
