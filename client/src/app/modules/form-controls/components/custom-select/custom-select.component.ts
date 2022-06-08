import {
  Input,
  OnInit,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Option {
  id: string;
  value: number;
  label: string;
}

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomSelectComponent,
      multi: true,
    },
  ],
})
export class CustomSelectComponent
  implements OnInit, ControlValueAccessor, OnChanges
{
  @Input() label: string = '';
  @Input() options: Option[] = [];
  @Input() selected?: number;
  @Input() invalid: boolean = false;

  value?: number;
  onChange?: (value: number) => void;
  onTouched?: () => void;

  isVisible: boolean = false;
  selectedOption?: Option;

  ngOnInit(): void {
    this.selectedOption = this.options.find(
      (option) => option.value === this.selected
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedOption = this.options.find(
      (option) => option.value === changes['selected'].currentValue
    );
  }

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
    this.isVisible = !this.isVisible;
  }

  onClickOutside(): void {
    this.isVisible = false;
  }

  selectOption(id: string): void {
    const selected = this.options.find((option) => option.id === id);

    if (!selected || !this.onChange) return;

    this.onChange(selected.value);
    this.selectedOption = selected;
    this.toggleVisibility();
  }
}
