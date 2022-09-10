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
  @Input() label: string = '';
  @Input() options: Option[] = [];
  @Input() invalid: boolean = false;

  value: number = 30;
  onChange!: (value: number) => void;
  onTouched!: () => void;

  visible: boolean = false;

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
  }

  onClickOutside(): void {
    this.visible = false;
  }

  selectOption(id: string): void {
    const selected = this.options.find((option) => option.id === id);

    if (selected) {
      this.onChange(selected.value);
      this.writeValue(selected.value);
      this.toggleVisibility();
    }
  }
}
