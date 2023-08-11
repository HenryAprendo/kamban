import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../model/task.model';
import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { DragItemComponent } from '../drag-item/drag-item.component';

@Component({
  selector: 'app-drop-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, MatCardModule, DragItemComponent],
  templateUrl: './drop-list.component.html',
  styleUrls: ['./drop-list.component.scss']
})
export class DropListComponent {

  @Input({required:true}) data:Task[] = [];

  @Input({required:true}) title = '';

  @Input() color: 'blue'|'purple'|'green' = 'blue';

  @Output() evCdkDropListDroped = new EventEmitter();

  drop(event:CdkDragDrop<Task[]>){
    this.evCdkDropListDroped.emit(event);
  };

}













