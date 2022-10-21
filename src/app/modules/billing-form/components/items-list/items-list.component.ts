import {
  FormGroup,
  FormArray,
  AbstractControl,
  FormGroupDirective,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BillingForm, ListItem } from '../../models/billing-form.model';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  form?: FormGroup<BillingForm>;

  readonly headers = ['item name', 'qty.', 'price', 'total'];

  constructor(
    private rootFormGroup: FormGroupDirective,
    private formService: BillingFormService
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  deleteItem(index: number): void {
    this.items.removeAt(index);
  }

  addItem(): void {
    const item = this.formService.generateListItem();
    this.items.push(item);
  }

  calculateItemTotal(index: number) {
    const item = this.items.controls[index];
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const itemTotal = quantity * price;

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
    return this.form?.get('items') as FormArray<FormGroup<ListItem>>;
  }
}
