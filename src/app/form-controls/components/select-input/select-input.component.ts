import { CommonModule } from '@angular/common';
import { Input, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { scaleDown } from '@shared/animations';
import { ClickedOutsideDirective } from '@shared/directives/clicked-outside/clicked-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PaymentTermsPipe } from 'app/form-controls/pipes/payment-terms.pipe';

interface Option {
  id: string;
  value: number;
  label: string;
}

const SELECT_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectInputComponent),
  multi: true,
};

const noop = (): any => undefined;

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    CommonModule,
    PaymentTermsPipe,
    ClickedOutsideDirective,
  ],
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [SELECT_INPUT_VALUE_ACCESSOR],
  animations: [scaleDown],
})
export class SelectInputComponent implements ControlValueAccessor {
  @Input() public label = '';
  @Input() public options: Option[] = [];
  @Input() public invalid = false;

  public value = 30;
  public onChange: (value: number) => void = noop;
  public onTouched: () => void = noop;

  public visible = false;

  public writeValue(value: number): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public toggleVisibility(): void {
    this.visible = !this.visible;
  }

  public onClickOutside(): void {
    this.visible = false;
  }

  public selectOption(id: string): void {
    const selected = this.options.find((option) => option.id === id);

    if (!selected) return;

    this.onChange(selected.value);
    this.writeValue(selected.value);
    this.toggleVisibility();
  }
}
