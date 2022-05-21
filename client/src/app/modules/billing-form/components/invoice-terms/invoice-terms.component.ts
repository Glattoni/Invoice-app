import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form-invoice-terms',
  templateUrl: './invoice-terms.component.html',
  styleUrls: ['./invoice-terms.component.scss'],
})
export class InvoiceTermsComponent implements OnInit {
  form?: FormGroup;
  deadline?: number;

  readonly options = [
    { id: '1', value: 1, label: 'Next 1 day' },
    { id: '7', value: 7, label: 'Next 7 days' },
    { id: '14', value: 14, label: 'Next 14 days' },
    { id: '30', value: 30, label: 'Next 30 days' },
  ];

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    this.deadline = this.paymentTerms?.value;
  }

  get createdAt() {
    return this.form?.get('createdAt');
  }

  get paymentTerms() {
    return this.form?.get('paymentTerms');
  }
}
