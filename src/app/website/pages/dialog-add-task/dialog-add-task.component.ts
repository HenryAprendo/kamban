import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Status {
  value:string;
  valueView:string;
}

@Component({
  selector: 'app-dialog-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './dialog-add-task.component.html',
  styles: [
  ]
})
export class DialogAddTaskComponent {

  status:Status[] = [ {value: 'todo', valueView: 'Todo'}, {value: 'doing', valueView: 'Doing'},{value: 'done', valueView: 'Done'} ];

  formBuilder = inject(FormBuilder);

  taskForm!:FormGroup;

  constructor(
    public dialogRef: DialogRef<string>,
    // @Inject(DIALOG_DATA) public data: DialogDataTask
  ){
    this.buildForm();
  }


  private buildForm(){
    this.taskForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
      subtasks: this.formBuilder.array([
        this.formBuilder.control(''),
      ]),
      status: ['todo']
    });
  }

  get subTasks(){
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask(){
    this.subTasks.push(this.formBuilder.control(''));
  }

  removeSubtask(index:number){
    this.subTasks.removeAt(index);
  }

}





















