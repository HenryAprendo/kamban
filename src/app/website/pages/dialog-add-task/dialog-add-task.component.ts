import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { STATUS } from './data';
import { States, TaskForm } from '../../../model/task.model';

@Component({
  selector: 'app-dialog-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatIconModule, MatDialogModule],
  templateUrl: './dialog-add-task.component.html',
  styles: [
  ]
})
export class DialogAddTaskComponent {

  /**
   * Opciones y valores para input select
   */
  status = STATUS;

  formBuilder = inject(FormBuilder);

  /**
   * Grupo de formulario principal.
   */
  taskForm!:FormGroup;

  /**
   * Información de salida del formulario, que se envia al componente padre.
   */
  task:TaskForm|undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogAddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskForm
  ){
    this.buildForm();
    this.taskForm.valueChanges.subscribe((data:TaskForm) => this.task = data);
  }

  /**
   * Método para construir el modelo del formulario con el servicio FormBuilder
   */
  private buildForm(){
    this.taskForm = this.formBuilder.group({
      title: ['',[Validators.required, Validators.maxLength(30)]],
      description: ['',[Validators.required, Validators.maxLength(100)]],
      tasks: this.formBuilder.array([
        this.formBuilder.control('',[Validators.minLength(15),Validators.maxLength(30)]),
      ]),
      status: [States.Todo]
    });
  }

  // Getters de campos de formularios.
  get fieldTitle(){
    return this.taskForm.get('title');
  }

  get fieldDescription(){
    return this.taskForm.get('description');
  }

  get tasks(){
    return this.taskForm.get('tasks') as FormArray;
  }

  /**
   * Agrega un control de formulario con validaciones en el control tasks
   */
  addSubtask(){
    this.tasks.push(this.formBuilder.control('',[Validators.minLength(15),Validators.maxLength(30)]));
  }

  /**
   * Remove un control de formulario con validaciones en el control tasks
   * @param index posición del control en el array de controles tasks
   */
  removeSubtask(index:number){
    this.tasks.removeAt(index);
  }

  /**
   * Método que cierra el cuadro de dialogo desde este mismo componente
   */
  closeDialog(){
    this.dialogRef.close();
  }

}





















