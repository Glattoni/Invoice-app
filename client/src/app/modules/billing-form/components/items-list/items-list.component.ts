import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'form-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  form: FormGroup | undefined = undefined;
  readonly headers = ['item name', 'qty.', 'price', 'total'];

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  deleteItem(idx: number): void {
    this.items.removeAt(idx);
  }

  addItem(): void {
    const item = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      total: [0, Validators.required],
    });

    this.items.push(item);
  }

  calculateItemTotal(idx: number) {
    const item = this.items.controls[idx];
    const quantity = parseInt(item.get('quantity')?.value);
    const price = parseInt(item.get('price')?.value);
    const itemTotal = quantity * price || 0;
    item.get('total')?.setValue(itemTotal);

    return itemTotal;
  }

  get items() {
    return this.form?.get('items') as FormArray;
  }
}
