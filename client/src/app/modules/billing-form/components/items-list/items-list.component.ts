import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  Validators,
  FormBuilder,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'form-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  form?: FormGroup;
  readonly headers = ['item name', 'qty.', 'price', 'total'];

  constructor(
    private formBuilder: FormBuilder,
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

  get items() {
    return this.form?.get('items') as FormArray;
  }
}
