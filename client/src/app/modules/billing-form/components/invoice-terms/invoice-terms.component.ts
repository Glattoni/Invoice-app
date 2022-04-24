import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form-invoice-terms',
  templateUrl: './invoice-terms.component.html',
  styleUrls: ['./invoice-terms.component.scss'],
})
export class InvoiceTermsComponent implements OnInit {
  form: FormGroup | undefined = undefined;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }
}
