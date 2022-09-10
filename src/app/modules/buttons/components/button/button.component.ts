import { Component, Input } from '@angular/core';
import { Button } from '../../types/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: Button = 'primary';
  @Input() disabled: boolean = false;
  @Input() hasIcon: boolean = false;
  @Input() small: boolean = false;
  @Input() type: string = 'button';
}
