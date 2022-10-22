import {
  state,
  style,
  trigger,
  animate,
  transition,
} from '@angular/animations';
import { Input, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [SELECT_INPUT_VALUE_ACCESSOR],
  animations: [
    trigger('scaleDown', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'scaleY(1)',
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
          transform: 'scaleY(0)',
        })
      ),
      transition('open => *', [animate('200ms ease-in')]),
      transition('* => open', [animate('200ms ease-out')]),
    ]),
  ],
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

    if (selected) {
      this.onChange(selected.value);
      this.writeValue(selected.value);
      this.toggleVisibility();
    }
  }
}
