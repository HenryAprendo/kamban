import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './../../../util/validators';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styles: [
  ]
})
export class CreateUserComponent {

  fb = inject(FormBuilder);

  createForm!:FormGroup;

  constructor(){
    this.formBuilder();
  }

  private formBuilder(){
    this.createForm = this.fb.group(
      {
        fullname: ['',[Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['',[Validators.required]]
      },
      {
        validators: MyValidators.matchPasswords
      }
    );
  }

  get fullNameField(){
    return this.createForm?.get('fullname');
  }
  get emailField(){
    return this.createForm?.get('email');
  }
  get passwordField(){
    return this.createForm?.get('password');
  }
  get confirmPasswordField(){
    return this.createForm?.get('confirmPassword');
  }

}


















