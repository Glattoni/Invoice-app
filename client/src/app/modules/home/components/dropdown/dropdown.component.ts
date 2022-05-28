import { Component } from '@angular/core';
import { InvoiceService } from '@core/services/invoice/invoice.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  value: string = '';
  index: number = -1;
  isVisible: boolean = false;
  statuses: string[] = ['draft', 'pending', 'paid'];

  constructor(private invoiceService: InvoiceService) {}

  onClick(event: MouseEvent, index: number): void {
    if (this.index === index) {
      this.index = -1;
      this.invoiceService.filterByStatus(null);
      (event.target as HTMLInputElement).checked = false;
    } else {
      this.index = index;
    }
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  clickedOutside(): void {
    this.isVisible = false;
  }

  onModelChange(value: string): void {
    this.value = value;
    this.invoiceService.filterByStatus(value);
  }
}
