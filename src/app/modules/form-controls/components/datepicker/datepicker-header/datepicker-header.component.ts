import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-datepicker-header',
  templateUrl: './datepicker-header.component.html',
  styleUrls: ['./datepicker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerHeaderComponent {
  @Input() public value = '';
  @Input() public format?: string;
  @Output() public cycleNext = new EventEmitter<void>();
  @Output() public cyclePrev = new EventEmitter<void>();
}
