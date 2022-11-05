import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { BillingFormService } from 'app/services/billing-form/billing-form.service';

import { BillingForm } from '../../models/billing-form.model';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from 'app/form-controls/components/text-input/text-input.component';
import { SelectInputComponent } from 'app/form-controls/components/select-input/select-input.component';
import { DisabledControlDirective } from '@shared/directives/disabled-control/disabled-control.directive';
import { DatepickerComponent } from 'app/form-controls/components/datepicker/datepicker.component';

@Component({
  selector: 'app-invoice-terms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    DisabledControlDirective,
    DatepickerComponent,
  ],
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
