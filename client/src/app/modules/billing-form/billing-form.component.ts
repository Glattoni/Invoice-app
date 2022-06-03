import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  Subject,
  Observable,
  map,
  filter,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  merge,
} from 'rxjs';

import { formatDate } from '@angular/common';
import { addDays, generateSlug } from 'src/utils';

import { Invoice, Item } from '@shared/models/invoice.model';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';

import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingFormComponent implements OnInit, OnDestroy {
  form?: UntypedFormGroup;
  valid: boolean = true;
  scrolledToBottom: boolean = false;

  payload$?: Observable<Invoice>;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private invoiceService: InvoiceService,
    private sidebarFormService: SidebarFormService
  ) {}

  ngOnInit(): void {
    this.payload$ = this.sidebarFormService.payload$;

    this.trackPayloadValueChanges();
    this.generateFormGroup();
    this.patchFormValue();
    this.trackFormValueChanges();
    this.trackItemListValueChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDiscard(): void {
    if (!this.form) return;

    this.valid = true;
    this.form.reset();
    this.sidebarFormService.close();
  }

  onCancel(): void {
    console.log('CANCEL');
    this.valid = true;
    this.form?.reset();
    this.createdAt?.enable();
    this.sidebarFormService.finishEditing();
  }

  onSaveAsDraft(): void {
    this.status?.setValue('draft');
    this.onSubmit();
  }

  onSubmit(): void {
    if (!this.form) return;

    this.validateForm(this.form);

    if (!this.valid) return;

    this.invoiceService.createInvoice(this.formData);
    this.form.reset();
    this.sidebarFormService.close();
  }

  onSaveChanges(invoiceId: string): void {
    if (!this.form) return;

    this.validateForm(this.form);

    if (!this.valid) return;

    this.invoiceService.updateInvoice(invoiceId, this.formData);
    this.form.reset();
    this.sidebarFormService.close();
  }

  onScroll(value: boolean): void {
    this.scrolledToBottom = value;
  }

  private generateFormGroup() {
    const slug = generateSlug();
    const senderAddress = this.generateAddressGroup();
    const clientAddress = this.generateAddressGroup();
    const creationDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.form = this.formBuilder.group({
      slug: slug,
      status: 'pending',
      senderAddress: senderAddress,
      clientAddress: clientAddress,
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      createdAt: [creationDate, Validators.required],
      paymentTerms: [30, Validators.required],
      paymentDue: ['', Validators.required],
      items: this.formBuilder.array([], Validators.required),
      description: '',
      total: 0,
    });
  }

  private generateAddressGroup() {
    return this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  private patchFormValue(): void {
    this.payload$
      ?.pipe(
        filter((payload) => payload !== null),
        takeUntil(this.destroy$)
      )
      .subscribe((invoice) => {
        console.log('PATCH_VALUE');

        this.form?.patchValue({
          senderAddress: invoice.senderAddress,
          clientAddress: invoice.clientAddress,
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail,
          createdAt: invoice.createdAt,
          paymentTerms: invoice.paymentTerms,
          description: invoice.description,
          items: this.patchItemList(invoice.items),
          status: invoice.status,
          total: invoice.total,
          slug: invoice.slug,
        });
        this.createdAt?.disable();
      });
  }

  private patchItemList(items: Item[]): void {
    this.items.clear();

    items.forEach((item) => {
      this.items.push(
        this.formBuilder.group({
          name: [item.name, Validators.required],
          quantity: [item.quantity, Validators.required],
          price: [item.price, Validators.required],
          total: [item.total, Validators.required],
        })
      );
    });
  }

  private trackFormValueChanges(): void {
    this.form
      ?.get('paymentDue')
      ?.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        console.log('DUE_VALUE', value);
      });

    if (this.createdAt && this.paymentTerms) {
      merge(this.createdAt.valueChanges, this.paymentTerms.valueChanges)
        .pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          takeUntil(this.destroy$)
        )
        .subscribe((value) => {
          this.calculatePaymentDueDate();
          console.log('DATE_VALUE', value);
        });
    }
  }

  private trackItemListValueChanges(): void {
    this.items.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.calculateAmountDue();
      });
  }

  private trackPayloadValueChanges(): void {
    this.payload$
      ?.pipe(
        map((payload) => !!payload),
        takeUntil(this.destroy$)
      )
      .subscribe((payload) => {
        !payload && this.form?.touched && this.form?.reset();
      });
  }

  private calculateAmountDue(): void {
    const amount = this.items.controls
      .map((control) => parseInt(control.get('total')?.value))
      .reduce((total, current) => total + current, 0);

    this.total?.setValue(amount);
  }

  private calculatePaymentDueDate(): void {
    const date = this.createdAt?.value;
    const amount = this.paymentTerms?.value;
    const due = addDays(date, amount);

    this.paymentDue?.setValue(due);
  }

  private validateForm(form: UntypedFormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  get formData() {
    return this.form?.getRawValue();
  }

  get total() {
    return this.form?.get('total');
  }

  get status() {
    return this.form?.get('status');
  }

  get createdAt() {
    return this.form?.get('createdAt');
  }

  get paymentDue() {
    return this.form?.get('paymentDue');
  }

  get paymentTerms() {
    return this.form?.get('paymentTerms');
  }

  get items() {
    return this.form?.get('items') as UntypedFormArray;
  }
}
