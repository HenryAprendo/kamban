import { Component, Inject, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { Task, States, SubTasks } from '../../../model/task.model';
import { STATUS } from '../../../data/data';

interface UpdateTask {
  status: States;
  subtasks: boolean[];
}

@Component({
  selector: 'app-dialog-view-task-and-update-progress',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './dialog-view-task-and-update-progress.component.html',
  styleUrls: ['./dialog-view-task-and-update-progress.component.scss']
})
export class DialogViewTaskAndUpdateProgressComponent {

  private formBuilder = inject(FormBuilder);

  editForm!:FormGroup;

  status = STATUS;

  constructor(
    public dialogRef: MatDialogRef<DialogViewTaskAndUpdateProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ){
    this.buildForm();
    this.data.subtasks.forEach(task => this.addControl(task.done));
    this.editForm.get('status')?.setValue(this.data.status);

    this.editForm.valueChanges.subscribe((result:UpdateTask) => {

      let mapa = new Map<number,SubTasks>();

      this.data.subtasks.forEach((item,i) => mapa.set(i,{...item}));

      let updateSubtasks = result.subtasks.map((value,i) => {
        let subtask = mapa.get(i)!;
        subtask.done = value;
        return subtask;
      })

      let updateTask:Task = {
        ...this.data,
        status: result.status,
        subtasks: [...updateSubtasks]
      }

    });
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








