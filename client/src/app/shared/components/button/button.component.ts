import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() hasIcon?: boolean;
  @Input() variant?: Button;
}

type Button = 'edit' | 'save' | 'delete' | 'add';
