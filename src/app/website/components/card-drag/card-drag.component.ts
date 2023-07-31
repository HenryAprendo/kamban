import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { Task, SubTasks } from '../../../model/task.model';

@Component({
  selector: 'app-card-drag',
  standalone: true,
  imports: [CommonModule, CdkDrag, MatCardModule],
  templateUrl: './card-drag.component.html',
  styles: [
  ]
})
export class CardDragComponent {

  @Input({required:true}) item!:Task ;

  numberSubstasksDone(subtasks:SubTasks[]){
    const taskDone = subtasks.filter(item => item.done === true);
    const result = `${taskDone.length} of ${subtasks.length} substasks`;
    return result;
  }

}
