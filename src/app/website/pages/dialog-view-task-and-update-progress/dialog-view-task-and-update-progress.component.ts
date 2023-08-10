import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { Task, States } from '../../../model/task.model';
import { STATUS } from '../../../data/data';

@Component({
  selector: 'app-dialog-view-task-and-update-progress',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './dialog-view-task-and-update-progress.component.html',
  styleUrls: ['./dialog-view-task-and-update-progress.component.scss']
})
export class DialogViewTaskAndUpdateProgressComponent implements OnInit {

  formBuilder = inject(FormBuilder);

  editForm!:FormGroup;

  status = STATUS;

  constructor(
    public dialogRef: MatDialogRef<DialogViewTaskAndUpdateProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ){
    this.buildForm();
  }

  ngOnInit(): void {
    // Agregando controles dinamicamente para checkbox, con su valor de estado boleano.
    this.data.subtasks.forEach(task => this.addControl(task.done));
    this.editForm.get('status')?.setValue(this.data.status);
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
    console.log('Ejecutando el metodo')
  }

  closeDialog(){
    this.dialogRef.close();
  }

}








