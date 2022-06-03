import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss'],
})
export class ClientInfoComponent implements OnInit {
  form?: UntypedFormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  get invalidEmail() {
    return this.email?.invalid && this.email.touched;
  }

  get invalidName() {
    return this.name?.invalid && this.name.touched;
  }

  get invalidStreet() {
    return this.street?.invalid && this.street.touched;
  }

  get invalidCity() {
    return this.city?.invalid && this.city.touched;
  }

  get invalidPostCode() {
    return this.postCode?.invalid && this.postCode.touched;
  }

  get invalidCountry() {
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
