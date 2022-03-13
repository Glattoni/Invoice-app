import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  @Input() id: string = '';
  @Input() slug: string = '';
  @Input() clientName: string = '';
  @Input() paymentDue: string = '';
  @Input() total: number = 0;
  @Input() status: string = '';
}
