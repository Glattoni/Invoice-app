import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@shared/services/invoice/invoice.service';
import { ModalService } from '@shared/services/modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() invoice?: Invoice;
  @Input() state?: String;

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
    this.invoiceService.markAsPaidInvoice(id).subscribe();
  }
}
