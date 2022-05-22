import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomInputComponent,
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() invalid?: boolean = false;
  @Input() placeholder: string = '';

  value: string = '';
  onTouched?: () => void;
  onChange?: (value: string) => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
