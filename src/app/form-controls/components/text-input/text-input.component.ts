import { Component, Input, forwardRef } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';

const TEXT_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextInputComponent),
  multi: true,
};

const noop = (): any => undefined;

@Component({
  standalone: true,
  selector: 'app-text-input',
  imports: [FormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [TEXT_INPUT_VALUE_ACCESSOR],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() public label = '';
  @Input() public type = 'text';
  @Input() public invalid?: boolean;
  @Input() public placeholder = '';

  public value = '';
  public onTouched: () => void = noop;
  public onChange: (value: string) => void = noop;

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
