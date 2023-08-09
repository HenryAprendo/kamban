import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-view-task-and-update-progress',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './dialog-view-task-and-update-progress.component.html',
  styleUrls: ['./dialog-view-task-and-update-progress.component.scss']
})
export class DialogViewTaskAndUpdateProgressComponent {

  formBuilder = inject(FormBuilder);

  constructor(
    public dialogRef: MatDialogRef<DialogViewTaskAndUpdateProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown
  ){
    console.log(this.data);
  }




  closeDialog(){
    this.dialogRef.close();
  }

}
