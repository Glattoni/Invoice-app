import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup } from '@angular/forms';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

import { BillingForm } from '../../models/billing-form.model';

@Component({
  selector: 'app-invoice-terms',
  templateUrl: './invoice-terms.component.html',
  styleUrls: ['./invoice-terms.component.scss'],
})
export class InvoiceTermsComponent implements OnInit {
  public form?: FormGroup<BillingForm>;

  public readonly options = [
    { id: '1', value: 1, label: 'Next 1 day' },
    { id: '7', value: 7, label: 'Next 7 days' },
    { id: '14', value: 14, label: 'Next 14 days' },
    { id: '30', value: 30, label: 'Next 30 days' },
  ];

  constructor(
    private readonly rootFormGroup: FormGroupDirective,
    private readonly billingFormService: BillingFormService
  ) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
  }

  public get editMode$(): Observable<boolean> {
    return this.billingFormService.editMode$;
  }

  public get createdAt() {
    return this.form?.get('createdAt');
  }

  public get description() {
    return this.form?.get('description');
  }

  public get invalidDescription() {
    return this.description?.invalid && this.description.touched;
  }
}
