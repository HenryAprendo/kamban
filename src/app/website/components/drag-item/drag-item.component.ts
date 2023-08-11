import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Task } from '../../../model/task.model';
import { numberSubstasksDone, getDefaultTask } from '../../../util/helpers/helpers';

@Component({
  selector: 'app-drag-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, CdkDrag],
  templateUrl: './drag-item.component.html',
  styleUrls: ['./drag-item.component.scss']
})
export class DragItemComponent {

  private _task = signal(getDefaultTask());

  completedSubtasks = computed(() => numberSubstasksDone(this._task().subtasks));

  @Input('item')
  get task(){ return this._task(); }
  set task(value:Task){
    this._task.set(value);
  }

}
