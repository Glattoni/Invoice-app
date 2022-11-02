import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup } from '@angular/forms';
import { BillingForm } from '../../models/billing-form.model';

@Component({
  selector: 'app-client-info',
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
