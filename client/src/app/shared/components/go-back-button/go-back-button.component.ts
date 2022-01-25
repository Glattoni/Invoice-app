import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@shared/services/invoice/invoice.service';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
})
export class GoBackButtonComponent implements OnInit {
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
