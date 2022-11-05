import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

import { BillingForm } from '../../models/billing-form.model';
import { TextInputComponent } from 'app/form-controls/components/text-input/text-input.component';

@Component({
  standalone: true,
  selector: 'app-sender-address',
  imports: [CommonModule, TextInputComponent, ReactiveFormsModule],
  templateUrl: './sender-address.component.html',
  styleUrls: ['./sender-address.component.scss'],
})
export class SenderAddressComponent implements OnInit {
  public form?: FormGroup<BillingForm>;

  constructor(private rootFormGroup: FormGroupDirective) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.control;
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

  private get street() {
    return this.form?.get('senderAddress.street');
  }

  private get city() {
    return this.form?.get('senderAddress.city');
  }

  private get postCode() {
    return this.form?.get('senderAddress.postCode');
  }

  private get country() {
    return this.form?.get('senderAddress.country');
  }
}
