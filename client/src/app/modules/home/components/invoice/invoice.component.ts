import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  @Input() clientName: string = '';
  @Input() paymentDue: string = '';
  @Input() total: string = '';
  @Input() status: string = '';
  constructor() {}

  ngOnInit(): void {}
}
