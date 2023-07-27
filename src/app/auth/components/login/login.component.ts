import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  loginForm!:FormGroup;

  constructor(){
    this.formBuilder();
  }

  private formBuilder(){
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      }
    );
  }

  sendDataAuthentication(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.router.navigate(['/dashboard']);
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  get emailField(){
    return this.loginForm?.get('email');
  }
  get passwordField(){
    return this.loginForm?.get('password');
  }

}

