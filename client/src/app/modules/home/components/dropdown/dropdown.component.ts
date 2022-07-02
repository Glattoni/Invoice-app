import {
  state,
  style,
  trigger,
  animate,
  transition,
} from '@angular/animations';

import { Component } from '@angular/core';
import { InvoiceService } from '@core/services/invoice/invoice.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('scaleDown', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0) scaleY(1)',
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
          transform: 'translateY(-10%) scaleY(0)',
        })
      ),
      transition('open => *', [animate('200ms ease-in')]),
      transition('* => open', [animate('200ms ease-out')]),
    ]),
  ],
})
export class DropdownComponent {
  value: string = '';
  index: number = -1;
  visible: boolean = false;
  statuses: string[] = ['draft', 'pending', 'paid'];

  constructor(private invoiceService: InvoiceService) {}

  onClick(event: MouseEvent, index: number): void {
    if (this.index === index) {
      this.index = -1;
      this.invoiceService.resetFilter();
      (event.target as HTMLInputElement).checked = false;
    } else {
      this.index = index;
    }
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
  }

  onClickOutside(): void {
    this.visible = false;
  }

  onModelChange(value: string): void {
    this.value = value;
    this.invoiceService.filterByStatus(value);
  }
}
