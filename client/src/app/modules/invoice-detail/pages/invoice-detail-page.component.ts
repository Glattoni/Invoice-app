import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Invoice } from '@shared/models/invoice.model';

import { ModalService } from '@core/services/modal/modal.service';
import { InvoiceService } from '@core/services/invoice/invoice.service';

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

  closeModal(id: string): void {
    this.modalService.close(id);
  }
}
