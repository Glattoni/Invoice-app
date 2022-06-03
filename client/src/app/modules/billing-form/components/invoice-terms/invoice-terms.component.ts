import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form-invoice-terms',
  templateUrl: './invoice-terms.component.html',
  styleUrls: ['./invoice-terms.component.scss'],
})
export class InvoiceTermsComponent implements OnInit {
  form?: UntypedFormGroup;
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

  get invalidDate() {
    return this.createdAt?.invalid && this.createdAt.touched;
  }

  get invalidTerms() {
    return this.paymentTerms?.invalid && this.paymentTerms.touched;
  }

  get invalidDescription() {
    return this.description?.invalid && this.description.touched;
  }

  get disabledCreatedAt() {
    return this.createdAt?.disabled;
  }

  private get createdAt() {
    return this.form?.get('createdAt');
  }

  private get paymentTerms() {
    return this.form?.get('paymentTerms');
  }

  private get description() {
    return this.form?.get('description');
  }
}
