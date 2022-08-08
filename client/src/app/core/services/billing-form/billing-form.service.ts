import { DateTime } from 'luxon';
import { generateSlug } from 'src/utils';

import { BehaviorSubject, ReplaySubject } from 'rxjs';

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { Invoice, Item } from '@shared/models/invoice.model';
import { ListItem } from '@modules/billing-form/models/billing-form.model';

const DEFAULT_PAYMENT_DUE = 30;
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

@Injectable({
  providedIn: 'root',
})
export class BillingFormService {
  private visible = new BehaviorSubject<boolean>(false);
  private payload = new ReplaySubject<Invoice>();

  readonly visible$ = this.visible.asObservable();
  readonly payload$ = this.payload.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: NonNullableFormBuilder
  ) {}

  getPaymentDue(date: string, duration: Object) {
    return DateTime.fromISO(date).plus(duration).toFormat(DEFAULT_DATE_FORMAT);
  }

  generateFormGroup() {
    const date = DateTime.now();
    const creationDate = date.toFormat(DEFAULT_DATE_FORMAT);
    const paymentDue = this.getPaymentDue(date.toISO(), {
      days: DEFAULT_PAYMENT_DUE,
    });

    return this.formBuilder.group({
      slug: [generateSlug(), Validators.required],
      status: ['pending', Validators.required],
      senderAddress: this.generateAddressGroup(),
      clientAddress: this.generateAddressGroup(),
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      createdAt: [creationDate, Validators.required],
      paymentTerms: [DEFAULT_PAYMENT_DUE, Validators.required],
      paymentDue: [paymentDue, Validators.required],
      items: this.formBuilder.array<FormGroup<ListItem>>(
        [],
        Validators.required
      ),
      description: ['', Validators.required],
      total: [0, Validators.required],
    });
  }

  generateListItem(item?: Item) {
    return this.formBuilder.group({
      name: [item?.name || '', Validators.required],
      quantity: [item?.quantity || 0, [Validators.required, Validators.min(1)]],
      price: [item?.price || 0, [Validators.required, Validators.min(0)]],
      total: [item?.total || 0, Validators.required],
    });
  }

  open(): void {
    this.visible.next(true);
    this.document.body.classList.add('form-open');
  }

  close(): void {
    this.visible.next(false);
    this.document.body.classList.remove('form-open');
  }

  startEditing(invoice: Invoice): void {
    this.payload.next(invoice);
    this.open();
  }

  finishEditing(): void {
    this.payload.next(null as any);
    this.close();
  }

  private generateAddressGroup() {
    return this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
}
