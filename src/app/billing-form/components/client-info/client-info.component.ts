import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

import { BillingForm } from '../../models/billing-form.model';

import { TextInputComponent } from 'app/form-controls/components/text-input/text-input.component';
import { DisabledControlDirective } from '@shared/directives/disabled-control/disabled-control.directive';

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    DisabledControlDirective,
  ],
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss'],
})
export class ClientInfoComponent implements OnInit {
  public form?: FormGroup<BillingForm>;

  constructor(private rootFormGroup: FormGroupDirective) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  public get invalidEmail(): boolean | undefined {
    return this.email?.invalid && this.email.touched;
  }

  public get invalidName(): boolean | undefined {
    return this.name?.invalid && this.name.touched;
  }

  public get invalidStreet(): boolean | undefined {
    return this.street?.invalid && this.street.touched;
  }

  public get invalidCity(): boolean | undefined {
    return this.city?.invalid && this.city.touched;
  }

  public get invalidPostCode(): boolean | undefined {
    return this.postCode?.invalid && this.postCode.touched;
  }

  public get invalidCountry(): boolean | undefined {
    return this.country?.invalid && this.country.touched;
  }

  private get email() {
    return this.form?.get('clientEmail');
  }

  private get name() {
    return this.form?.get('clientName');
  }

  private get street() {
    return this.form?.get('clientAddress.street');
  }

  private get city() {
    return this.form?.get('clientAddress.city');
  }

  private get postCode() {
    return this.form?.get('clientAddress.postCode');
  }

  private get country() {
    return this.form?.get('clientAddress.country');
  }
}
