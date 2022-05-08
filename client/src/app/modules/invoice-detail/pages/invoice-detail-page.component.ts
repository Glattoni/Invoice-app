import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Invoice } from '@shared/models/invoice.model';

import { ModalService } from '@core/services/modal/modal.service';
import { InvoiceService } from '@core/services/invoice/invoice.service';

//TODO: move to separate file
export enum GoBack {
  Link = 'link',
  Button = 'button',
}

@Component({
  templateUrl: './invoice-detail-page.component.html',
  styleUrls: ['./invoice-detail-page.component.scss'],
})
export class InvoiceDetailPageComponent implements OnInit {
  invoice$?: Observable<Invoice>;
  linkType = GoBack.Link;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.invoice$ = this.invoiceService.invoice$;
    this.getInvoice();
  }

  getInvoice(): void {
    const invoiceId = String(this.route.snapshot.paramMap.get('id'));
    this.invoiceService.getInvoice(invoiceId);
  }

  deleteInvoice(invoiceId: string): void {
    this.invoiceService.deleteInvoice(invoiceId);
    this.router.navigate(['']);
  }

  closeModal(modalId: string): void {
    this.modalService.close(modalId);
  }
}
