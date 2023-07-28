import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export interface DialogData {
  title:string;
}

@Component({
  selector: 'app-dialog-input-data',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-input-data.component.html',
  styles: [
  ]
})
export class DialogInputDataComponent {

  constructor(
    public dialogRef:MatDialogRef<DialogInputDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){ }

  onNoClick(): void {
    this.dialogRef.close();
  }

}














