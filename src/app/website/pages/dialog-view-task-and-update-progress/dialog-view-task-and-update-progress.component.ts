import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { Task, States, SubTasks, UpdateTask } from '../../../model/task.model';
import { STATUS } from '../../../data/data';
import { numberSubstasksDone } from '../../../util/helpers/helpers';

import { UpdateBoard } from '../../../model/board.model';
import { BoardService } from '../../../services/board.service';



@Component({
  selector: 'app-dialog-view-task-and-update-progress',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './dialog-view-task-and-update-progress.component.html',
  styleUrls: ['./dialog-view-task-and-update-progress.component.scss']
})
export class DialogViewTaskAndUpdateProgressComponent {

  private boardService = inject(BoardService);

  private formBuilder = inject(FormBuilder);

  editForm!:FormGroup;

  status = STATUS;

  completedSubtasks:string;


  constructor(
    public dialogRef: MatDialogRef<DialogViewTaskAndUpdateProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateBoard
  ){
    this.buildForm();

    let dta = this.data.task;

    dta.subtasks.forEach(subtask => this.addControl(subtask.done));

    this.editForm.get('status')?.setValue(dta.status);

    this.completedSubtasks = numberSubstasksDone(dta.subtasks);

    this.editForm.valueChanges
      .subscribe((result:UpdateTask) => {
        this.updateTask({...this.data}, result, dta.status);
      });
  }

  private updateTask(data:UpdateBoard, dta:UpdateTask, previusTaskStatus:States){

    let mapa = new Map<number,SubTasks>();
    data.task.subtasks.forEach((item,i) => mapa.set(i,{...item}));

    let updateSubtasks = dta.subtasks.map((value,i) => {
      let subtask = mapa.get(i)!;
      subtask.done = value;
      return subtask;
    })

    let updateTask:Task = {
      ...data.task,
      status: dta.status,
      subtasks: [...updateSubtasks]
    }

    this.completedSubtasks = numberSubstasksDone([...updateSubtasks]);
    this.boardService.updateTaskOfBoard(data.boardId,updateTask, previusTaskStatus);
  }

  private buildForm() {
    this.editForm = this.formBuilder.group({
      subtasks: this.formBuilder.array([ ]),
      status: [States.Todo]
    });
  }

  get subtasks(){
    return this.editForm.get('subtasks') as FormArray;
  }

  addControl(value:boolean){
    this.subtasks.push(this.formBuilder.control(value));
  }

  closeDialog(){
    this.dialogRef.close();
  }

}








