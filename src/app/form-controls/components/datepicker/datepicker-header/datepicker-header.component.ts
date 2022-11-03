import { AngularSvgIconModule } from 'angular-svg-icon';

import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-datepicker-header',
  imports: [AngularSvgIconModule, DatePipe],
  template: `
    <div class="header">
      <div class="header__icon" (click)="cyclePrev.emit()">
        <svg-icon src="assets/icons/chevron.svg"></svg-icon>
      </div>
      <span>{{ value | date: format }}</span>
      <div class="header__icon" (click)="cycleNext.emit()">
        <svg-icon src="assets/icons/chevron.svg"></svg-icon>
      </div>
    </div>
  `,
  styleUrls: ['./datepicker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerHeaderComponent {
  @Input() public value = '';
  @Input() public format?: string;
  @Output() public cycleNext = new EventEmitter<void>();
  @Output() public cyclePrev = new EventEmitter<void>();
}
