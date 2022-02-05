import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@shared/services/invoice/invoice.service';
import { ModalService } from '@shared/services/modal/modal.service';

@Component({
  templateUrl: './invoice-detail-page.component.html',
  styleUrls: ['./invoice-detail-page.component.scss'],
})
export class InvoiceDetailPageComponent implements OnInit {
  @Input() invoice?: Invoice;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice(): void {
    const id = String(this.route.snapshot.paramMap.get('slug'));
    this.invoiceService
      .getInvoice(id)
      .subscribe((invoice) => (this.invoice = invoice));
  }

  deleteInvoice(): void {
    const id = String(this.route.snapshot.paramMap.get('slug'));
    this.invoiceService.deleteInvoice(id).subscribe();
    this.router.navigate(['']);
  }

  //TODO refresh the route if the data does not change after invoice deletion
  /* reloadCurrentRoute(): void {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['']));
  } */

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
