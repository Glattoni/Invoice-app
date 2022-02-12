import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@shared/services/invoice/invoice.service';
import { ModalService } from '@shared/services/modal/modal.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './invoice-detail-page.component.html',
  styleUrls: ['./invoice-detail-page.component.scss'],
})
export class InvoiceDetailPageComponent implements OnInit {
  invoice$: Observable<Invoice>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private invoiceService: InvoiceService
  ) {
    this.invoice$ = this.invoiceService.invoice$;
  }

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice(): void {
    const id = String(this.route.snapshot.paramMap.get('slug'));
    this.invoiceService.getInvoice(id);
  }

  deleteInvoice(): void {
    const id = String(this.route.snapshot.paramMap.get('slug'));
    this.invoiceService.deleteInvoice(id);
    this.router.navigate(['']);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
