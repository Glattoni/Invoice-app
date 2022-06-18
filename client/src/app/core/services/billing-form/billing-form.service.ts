import { DOCUMENT } from '@angular/common';
import { formatDate } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { addDays, generateSlug } from 'src/utils';
import { Invoice, Item } from '@shared/models/invoice.model';
import { ListItem } from '@modules/billing-form/models/billing-form.model';

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

  generateFormGroup() {
    const slug = generateSlug();
    const senderAddress = this.generateAddressGroup();
    const clientAddress = this.generateAddressGroup();
    const creationDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const paymentDue = addDays(creationDate, 30);

    return this.formBuilder.group({
      slug: [slug, Validators.required],
      status: ['pending', Validators.required],
      senderAddress: senderAddress,
      clientAddress: clientAddress,
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      createdAt: [creationDate, Validators.required],
      paymentTerms: [30, Validators.required],
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
      quantity: [item?.quantity || 0, Validators.required],
      price: [item?.price || 0, Validators.required],
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
