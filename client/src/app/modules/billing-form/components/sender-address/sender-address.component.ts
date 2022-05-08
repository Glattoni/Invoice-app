import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form-sender-address',
  templateUrl: './sender-address.component.html',
  styleUrls: ['./sender-address.component.scss'],
})
export class SenderAddressComponent implements OnInit {
  form?: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  get senderStreet() {
    return this.form?.get('senderAddress.street');
  }

  get senderCity() {
    return this.form?.get('senderAddress.city');
  }

  get senderPostCode() {
    return this.form?.get('senderAddress.postCode');
  }

  get senderCountry() {
    return this.form?.get('senderAddress.country');
  }
}
