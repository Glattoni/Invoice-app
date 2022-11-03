import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Day {
  value: number;
  next: boolean;
  selected: boolean;
}

@Component({
  standalone: true,
  selector: 'app-datepicker-grid',
  imports: [CommonModule],
  template: `
    <div class="container">
      <div
        class="day"
        *ngFor="let day of days"
        (click)="selectDay(day)"
        [class.upcoming]="day.next"
        [class.selected]="day.selected"
      >
        {{ day.value }}
      </div>
    </div>
  `,
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
