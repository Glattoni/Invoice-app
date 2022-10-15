import { DateTime } from 'luxon';
import { generateSlug } from 'src/utils';

import { BehaviorSubject, ReplaySubject } from 'rxjs';

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
  FormArray,
  FormGroup,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';

import { Invoice, Item } from '@shared/models/invoice.model';
import { DATE_FORMAT } from '@shared/constants/date-formats.constants';
import {
  Address,
  BillingForm,
  ListItem,
} from '@modules/billing-form/models/billing-form.model';
import { InvoiceStatus } from '@shared/constants/invoice.constants';

const newItem: Item = {
  name: '',
  quantity: 0,
  price: 0,
  total: 0,
};

@Injectable({
  providedIn: 'root',
})
export class BillingFormService {
  private visible = new BehaviorSubject<boolean>(false);
  private payload = new ReplaySubject<Invoice>();

  public readonly visible$ = this.visible.asObservable();
  public readonly payload$ = this.payload.asObservable();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly formBuilder: NonNullableFormBuilder
  ) {}

  public getPaymentDue(date: string, duration: object): string {
    return DateTime.fromISO(date).plus(duration).toFormat(DATE_FORMAT.DEFAULT);
  }

  public get formControls(): FormGroup<BillingForm> {
    return this.formBuilder.group({
      slug: [generateSlug(), Validators.required],
      status: ['pending' as InvoiceStatus, Validators.required],
      senderAddress: this.addressGroup,
      clientAddress: this.addressGroup,
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      createdAt: [this.creationDate, Validators.required],
      paymentTerms: [30, Validators.required],
      paymentDue: [this.paymentDue, Validators.required],
      items: this.itemsGroup,
      description: ['', Validators.required],
      total: [0, Validators.required],
    });
  }

  public generateListItem(item = newItem) {
    return this.formBuilder.group({
      name: [item.name, Validators.required],
      quantity: [item.quantity, [Validators.required, Validators.min(1)]],
      price: [item.price, [Validators.required, Validators.min(0)]],
      total: [item.total, Validators.required],
    });
  }

  public open(): void {
    this.visible.next(true);
    this.document.body.classList.add('form-open');
  }

  public close(): void {
    this.visible.next(false);
    this.document.body.classList.remove('form-open');
  }

  public startEditing(invoice: Invoice): void {
    this.payload.next(invoice);
    this.open();
  }

  public finishEditing(): void {
    this.payload.next(null as any);
    this.close();
  }

  private get addressGroup(): FormGroup<Address> {
    return this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  private get itemsGroup(): FormArray<FormGroup<ListItem>> {
    return this.formBuilder.array<FormGroup<ListItem>>([], Validators.required);
  }

  private get paymentDue(): string {
    return this.getPaymentDue(DateTime.now().toISO(), { days: 30 });
  }

  private get creationDate(): string {
    return DateTime.now().toFormat(DATE_FORMAT.DEFAULT);
  }
}
