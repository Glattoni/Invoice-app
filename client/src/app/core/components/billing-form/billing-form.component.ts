import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
})
export class BillingFormComponent implements OnInit {
  billingForm: FormGroup;

  readonly options: any = [
    { id: '1', label: 'Next 1 day' },
    { id: '2', label: 'Next 7 days' },
    { id: '3', label: 'Next 14 days' },
    { id: '4', label: 'Next 30 days' },
  ];

  private readonly address = this.fb.group({
    street: '',
    city: '',
    postCode: '',
    country: '',
  });

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      senderAddress: this.address,
      clientName: '',
      clientEmail: '',
      clientAddress: this.address,
      invoiceDate: '',
      paymentTerms: '',
      projectDescription: '',
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.billingForm.valueChanges.subscribe((value) => console.log(value));
  }

  get itemForms() {
    return this.billingForm.get('items') as FormArray;
  }

  addItem(): void {
    const item = this.fb.group({
      name: '',
      quantity: '',
      price: '',
      total: '',
    });

    this.itemForms.push(item);
  }

  deleteItem(idx: number): void {
    this.itemForms.removeAt(idx);
  }
}
