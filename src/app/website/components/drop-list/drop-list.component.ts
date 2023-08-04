import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubTasks, Task } from '../../../model/task.model';
import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-drop-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, MatCardModule],
  templateUrl: './drop-list.component.html',
  styleUrls: ['./drop-list.component.scss']
})
export class DropListComponent {

  @Input({required:true}) data:Task[] = [];

  @Input({required:true}) title = '';

  @Output() evCdkDropListDroped = new EventEmitter();

  drop(event:CdkDragDrop<Task[]>){
    this.evCdkDropListDroped.emit(event);
  };

  numberSubstasksDone(subtasks:SubTasks[]){
    const taskDone = subtasks.filter(item => item.done === true);
    const result = `${taskDone.length} of ${subtasks.length} substasks`;
    return result;
  }

}
