import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalService } from '@core/services/modal/modal.service';
import { InvoiceService } from '@core/services/invoice/invoice.service';

import { Invoice } from '@shared/models/invoice.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() invoice?: Invoice;
  @Input() state?: string;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private invoiceService: InvoiceService
  ) {}

  openModal(id: string) {
    this.modalService.open(id);
  }

  markAsPaid(): void {
    const id = String(this.route.snapshot.paramMap.get('slug'));
    this.invoiceService.markAsPaidInvoice(id);
  }
}
