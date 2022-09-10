import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { GoBack } from '@modules/buttons/components/go-back-button/go-back-button.component';

@Component({
  templateUrl: './invoice-detail-page.component.html',
  styleUrls: ['./invoice-detail-page.component.scss'],
})
export class InvoiceDetailPageComponent implements OnInit {
  invoice$?: Observable<Invoice>;
  link: GoBack = GoBack.Link;

  constructor(
    private route: ActivatedRoute,
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
}
