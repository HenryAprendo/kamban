import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'item-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './link.component.html',
  styles: [
  ]
})
export class LinkComponent {

  @Input({required: true}) path = '/';
  @Input({required: true}) title = 'name link';

}
