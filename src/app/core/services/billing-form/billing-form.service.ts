import { DateTime } from 'luxon';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
  FormArray,
  FormGroup,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';

import { Item } from '@shared/models/invoice.model';
import { DATE_FORMAT } from '@shared/constants/date-formats.constants';
import {
  Address,
  BillingForm,
  ListItem,
} from '@modules/billing-form/models/billing-form.model';
import { InvoiceStatus } from '@shared/constants/invoice.constants';
import { generateSlug } from 'src/utils';

const newItem: Item = {
  name: '',
  quantity: 0,
  price: 0,
  total: 0,
};

type Mode = 'CREATE' | 'EDIT';

@Injectable({
  providedIn: 'root',
})
export class BillingFormService {
  private mode = new BehaviorSubject<Mode>('CREATE');
  private visible = new BehaviorSubject<boolean>(false);

  public readonly visible$ = this.visible.asObservable();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly formBuilder: NonNullableFormBuilder
  ) {}

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

  public get editMode$(): Observable<boolean> {
    return this.mode.pipe(map((mode) => mode === 'EDIT'));
  }

  public getPaymentDue(date: string, duration: object): string {
    return DateTime.fromISO(date).plus(duration).toFormat(DATE_FORMAT.DEFAULT);
  }

  public generateListItem(item = newItem): FormGroup<ListItem> {
    return this.formBuilder.group({
      name: [item.name, Validators.required],
      quantity: [item.quantity, [Validators.required, Validators.min(1)]],
      price: [item.price, [Validators.required, Validators.min(0.01)]],
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

  public startEditing(): void {
    this.mode.next('EDIT');
    this.open();
  }

  public finishEditing(): void {
    this.mode.next('CREATE');
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
