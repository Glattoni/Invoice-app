import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class CustomSelectComponent implements OnInit, ControlValueAccessor {
  @Input() options: Option[] = [];
  @Input() selected?: number;
  @Input() label: string = '';
  @Input() invalid: boolean = false;

  value?: number;
  onChange?: (value: number) => void;
  onTouched?: () => void;

  isVisible: boolean = false;
  selectedOption?: Option;

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    if (!this.selected) return;

    this.selectedOption = this.options.find(
      (option) => option.value === this.selected
    );
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  clickedOutside(): void {
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

interface Option {
  id: string;
  value: number;
  label: string;
}
