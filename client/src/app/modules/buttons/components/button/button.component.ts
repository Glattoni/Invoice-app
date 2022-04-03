import { Component, Input } from '@angular/core';
import { Button } from '../../types/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() hasIcon: boolean = false;
  @Input() variant: Button = 'primary';
  @Input() small: boolean = false;
}
