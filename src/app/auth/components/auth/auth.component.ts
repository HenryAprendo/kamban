import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LinkComponent } from './../link/link.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LinkComponent],
  templateUrl: './auth.component.html',
  styles: [
  ]
})
export default class AuthComponent {

}
