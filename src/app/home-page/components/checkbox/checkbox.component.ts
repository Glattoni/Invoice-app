import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import {
  Input,
  Output,
  ViewChild,
  Component,
  ElementRef,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() public name = '';
  @Input() public value = '';
  @Input() public label = '';

  @Output() public readonly check = new EventEmitter<string>();
  @Output() public readonly unCheck = new EventEmitter<void>();

  @ViewChild('input') public readonly input?: ElementRef<HTMLInputElement>;

  public onChange({ target }: Event): void {
    this.check.emit((target as HTMLInputElement).value);
  }

  public onClick(event: MouseEvent): void {
    if (this.input?.nativeElement.checked) {
      this.input.nativeElement.checked = false;
      event.preventDefault();
      this.unCheck.emit();
    }
  }
}
