import {
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  FormGroupDirective,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BillingForm } from '../../models/billing-form.model';

@Component({
  selector: 'form-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  form?: FormGroup<BillingForm>;

  readonly headers = ['item name', 'qty.', 'price', 'total'];

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private rootFormGroup: FormGroupDirective
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  deleteItem(index: number): void {
    this.items.removeAt(index);
  }

  addItem(): void {
    const item = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      total: [0, Validators.required],
    });

    this.items.push(item);
  }

  calculateItemTotal(index: number) {
    const item = this.items.controls[index];
    const quantity = parseInt(item.get('quantity')?.value);
    const price = parseInt(item.get('price')?.value);
    const itemTotal = quantity * price || 0;

    item.get('total')?.setValue(itemTotal);

    return itemTotal;
  }

  invalidItemName(item: AbstractControl) {
    return item.get('name')?.invalid && item.get('name')?.touched;
  }

  invalidItemQuantity(item: AbstractControl) {
    return item.get('quantity')?.invalid && item.get('quantity')?.touched;
  }

  invalidItemPrice(item: AbstractControl) {
    return item.get('price')?.invalid && item.get('price')?.touched;
  }

  get items() {
    // TODO: infer proper type for FormArray
    return this.form?.get('items') as FormArray;
  }
}
