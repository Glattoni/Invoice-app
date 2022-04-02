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
    street: [''],
    city: [''],
    postCode: [''],
    country: [''],
  });

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      senderAddress: this.address,
      clientName: [''],
      clientEmail: [''],
      clientAddress: this.address,
      invoiceDate: [''],
      paymentTerms: [''],
      projectDescription: [''],
      items: this.fb.array([]),
      total: 0,
    });
  }

  ngOnInit(): void {
    this.billingForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
    this.itemForms.valueChanges.subscribe((_) => {
      this.calculateTotal();
    });
  }

  get itemForms() {
    return this.billingForm.get('items') as FormArray;
  }

  addItem(): void {
    const item = this.fb.group({
      name: [''],
      quantity: [''],
      price: [''],
      total: [0],
    });

    this.itemForms.push(item);
  }

  deleteItem(idx: number): void {
    this.itemForms.removeAt(idx);
  }

  calculateItemTotal(idx: number) {
    const item = this.itemForms.controls[idx];
    const quantity = parseInt(item.get('quantity')?.value);
    const price = parseInt(item.get('price')?.value);
    const totalPrice = quantity * price || '';
    item.get('total')?.setValue(totalPrice);

    return totalPrice;
  }

  calculateTotal() {
    const grandTotal = this.billingForm.get('total');
    const amountDue = this.itemForms.controls
      .map((c) => parseInt(c.get('total')?.value))
      .reduce((a, b) => a + b);

    grandTotal?.setValue(amountDue);
    return;
  }
}
