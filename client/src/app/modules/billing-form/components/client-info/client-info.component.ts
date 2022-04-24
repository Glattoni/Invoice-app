import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss'],
})
export class ClientInfoComponent implements OnInit {
  form: FormGroup | undefined = undefined;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  get clientEmail() {
    return this.form?.get('clientEmail');
  }

  get clientName() {
    return this.form?.get('clientName');
  }

  get clientStreet() {
    return this.form?.get('clientAddress.street');
  }

  get clientCity() {
    return this.form?.get('clientAddress.city');
  }

  get clientPostCode() {
    return this.form?.get('clientAddress.postCode');
  }

  get clientCountry() {
    return this.form?.get('clientAddress.country');
  }
}
