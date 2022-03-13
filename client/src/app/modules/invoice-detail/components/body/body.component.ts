import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  @Input() slug?: string;
  @Input() description?: string;
  @Input() createdAt?: string;
  @Input() paymentDue?: string;
  @Input() clientName?: string;
  @Input() clientEmail?: string;
  @Input() senderAddress?: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  @Input() clientAddress?: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
}
