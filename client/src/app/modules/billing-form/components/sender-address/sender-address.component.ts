import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form-sender-address',
  templateUrl: './sender-address.component.html',
  styleUrls: ['./sender-address.component.scss'],
})
export class SenderAddressComponent implements OnInit {
  form?: UntypedFormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
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
