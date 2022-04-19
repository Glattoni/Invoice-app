import {
  OnInit,
  OnDestroy,
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  Subject,
  takeUntil,
  fromEvent,
  throttleTime,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { addDays, generateSlug } from 'src/utils';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { InvoiceService } from '@core/services/invoice/invoice.service';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingFormComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();

  form: FormGroup;
  valid: boolean = true;
  submitted: boolean = false;
  scrolledToBottom: boolean = false;

  private generateAddressGroup() {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private sidebarFormService: SidebarFormService,
    private invoiceService: InvoiceService
  ) {
    this.form = this.fb.group({
      status: 'pending',
      slug: generateSlug(),
      senderAddress: this.generateAddressGroup(),
      clientAddress: this.generateAddressGroup(),
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      createdAt: ['', Validators.required],
      paymentTerms: ['30', Validators.required],
      paymentDue: ['', Validators.required],
      items: this.fb.array([], Validators.required),
      description: '',
      total: 0,
    });
  }

  @ViewChild('formContainer') formContainer: ElementRef | undefined;

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.getPaymentDueDate();
      });

    this.items.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.calculateTotal();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleScroll(e: any) {
    return (
      e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight - 100
    );
  }

  ngAfterViewInit() {
    fromEvent(this.formContainer?.nativeElement, 'scroll', this.handleScroll)
      .pipe(throttleTime(25), takeUntil(this.destroy$))
      .subscribe((value) => (this.scrolledToBottom = value));
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

  deleteItem(idx: number): void {
    this.items.removeAt(idx);
  }

  calculateItemTotal(idx: number) {
    const item = this.items.controls[idx];
    const quantity = parseInt(item.get('quantity')?.value);
    const price = parseInt(item.get('price')?.value);
    const itemTotal = quantity * price || 0;
    item.get('total')?.setValue(itemTotal);

    return itemTotal;
  }

  calculateTotal(): void {
    const grandTotal = this.items.controls
      .map((c) => parseInt(c.get('total')?.value))
      .reduce((a, b) => a + b, 0);

    this.total?.setValue(grandTotal);
  }

  getPaymentDueDate(): void {
    const date = this.createdAt?.value;
    const amount = this.paymentTerms?.value;
    const due = addDays(date, amount);

    this.paymentDue?.setValue(due, { onlySelf: true });
  }

  discardForm(): void {
    this.valid = true;
    this.form.reset();
    this.sidebarFormService.close();
  }

  saveAsDraft(): void {
    this.status?.setValue('draft');
    this.onSubmit();
  }

  validateForm(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.validateForm(this.form);
    if (this.valid) {
      this.invoiceService.createInvoice(this.formData);
      this.form.reset();
      this.sidebarFormService.close();
    }
  }

  get formData() {
    return this.form.value;
  }

  get total() {
    return this.form.get('total');
  }

  get status() {
    return this.form.get('status');
  }

  get createdAt() {
    return this.form.get('createdAt');
  }

  get paymentDue() {
    return this.form.get('paymentDue');
  }

  get paymentTerms() {
    return this.form.get('paymentTerms');
  }

  get clientEmail() {
    return this.form.get('clientEmail');
  }

  get senderStreet() {
    return this.form.get('senderAddress.street');
  }

  get senderCity() {
    return this.form.get('senderAddress.city');
  }

  get senderPostCode() {
    return this.form.get('senderAddress.postCode');
  }

  get senderCountry() {
    return this.form.get('senderAddress.country');
  }

  get clientName() {
    return this.form.get('clientName');
  }

  get clientStreet() {
    return this.form.get('clientAddress.street');
  }

  get clientCity() {
    return this.form.get('clientAddress.city');
  }

  get clientPostCode() {
    return this.form.get('clientAddress.postCode');
  }

  get clientCountry() {
    return this.form.get('clientAddress.country');
  }

  get items() {
    return this.form.get('items') as FormArray;
  }
}
