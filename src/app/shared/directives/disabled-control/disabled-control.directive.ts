import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '([formControlName], [formControl])[disabledControl]',
})
export class DisabledControlDirective {
  @Input() public set disabledControl(condition: boolean) {
    condition
      ? this.ngControl.control?.disable()
      : this.ngControl.control?.enable();
  }

  constructor(private readonly ngControl: NgControl) { }
}
