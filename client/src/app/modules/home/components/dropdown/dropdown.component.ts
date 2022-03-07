import { Component } from '@angular/core';
import { InvoiceService } from '@shared/services/invoice/invoice.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  statuses: string[] = ['draft', 'pending', 'paid'];
  isVisible: boolean = false;

  constructor(private invoiceService: InvoiceService) {}

  toggleIsVisible(): void {
    this.isVisible = this.isVisible ? false : true;
  }

  filterByStatus(status: string): void {
    this.invoiceService.filterByStatus(status);
  }
}
