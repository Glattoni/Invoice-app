import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@shared/services/invoice/invoice.service';

@Component({
  templateUrl: './invoice-detail-page.component.html',
  styleUrls: ['./invoice-detail-page.component.scss'],
})
export class InvoiceDetailPageComponent implements OnInit {
  @Input() invoice?: Invoice;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private invoiceService: InvoiceService
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

  goBack(): void {
    this.location.back();
  }
}
