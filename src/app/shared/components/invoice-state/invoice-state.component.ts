import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invoice-state',
  templateUrl: './invoice-state.component.html',
  styleUrls: ['./invoice-state.component.scss'],
})
export class InvoiceStateComponent {
  @Input() variant: String = 'pending';
}
