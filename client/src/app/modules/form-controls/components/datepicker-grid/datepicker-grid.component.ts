import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Day {
  value: number;
  next: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-datepicker-grid',
  templateUrl: './datepicker-grid.component.html',
  styleUrls: ['./datepicker-grid.component.scss'],
})
export class DatepickerGridComponent {
  @Input() public days: Day[] = [];
  @Input() public selected = false;
  @Output() public daySelection = new EventEmitter<Day>();

  public selectDay(day: Day): void {
    this.daySelection.emit(day);
  }
}
