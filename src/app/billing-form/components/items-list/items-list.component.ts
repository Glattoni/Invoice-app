import { AngularSvgIconModule } from 'angular-svg-icon';

import {
  FormGroup,
  FormArray,
  AbstractControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BillingForm, ListItem } from '../../models/billing-form.model';

import { BillingFormService } from 'app/services/billing-form/billing-form.service';
import { TextInputComponent } from 'app/form-controls/components/text-input/text-input.component';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    CommonModule,
    TextInputComponent,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  public form?: FormGroup<BillingForm>;

  public readonly headers = ['item name', 'qty.', 'price', 'total'];

  constructor(
    private readonly rootFormGroup: FormGroupDirective,
    private readonly billingFormService: BillingFormService
  ) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  public deleteItem(index: number): void {
    this.items.removeAt(index);
  }

  public addItem(): void {
    this.items.push(this.billingFormService.generateListItem());
  }

  public calculateItemTotal(index: number): number {
    const item = this.items.controls[index];
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const itemTotal = quantity * price;

    item.get('total')?.setValue(itemTotal);

    return itemTotal;
  }

  public invalidItemName(item: AbstractControl): boolean | undefined {
    return item.get('name')?.invalid && item.get('name')?.touched;
  }

  public invalidItemQuantity(item: AbstractControl): boolean | undefined {
    return item.get('quantity')?.invalid && item.get('quantity')?.touched;
  }

  public invalidItemPrice(item: AbstractControl): boolean | undefined {
    return item.get('price')?.invalid && item.get('price')?.touched;
  }

  public get items(): FormArray<FormGroup<ListItem>> {
    return this.form?.get('items') as FormArray<FormGroup<ListItem>>;
  }
}
