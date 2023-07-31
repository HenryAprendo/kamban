import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container-drap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-3">
      <h2>{{title}}</h2>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
  ]
})
export class ContainerDrapComponent {

  @Input({required:true}) title = '';

}
