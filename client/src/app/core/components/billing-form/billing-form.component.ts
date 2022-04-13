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
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { InvoiceService } from '@core/services/invoice/invoice.service';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingFormComponent implements OnInit, OnDestroy, AfterViewInit {
  billingForm: FormGroup;
  isBottom: boolean = false;
  submitted: boolean = false;
  private destroy$ = new Subject<void>();

  readonly options: any = [
    { id: '1', label: 'Next 1 day' },
    { id: '2', label: 'Next 7 days' },
    { id: '3', label: 'Next 14 days' },
    { id: '4', label: 'Next 30 days' },
  ];

  private readonly address = this.fb.group({
    street: [''],
    city: [''],
    postCode: [''],
    country: [''],
  });

  constructor(
    private fb: FormBuilder,
    private sidebarFormService: SidebarFormService,
    private invoiceService: InvoiceService
  ) {
    this.billingForm = this.fb.group({
      slug: generateSlug(),
      senderAddress: this.address,
      clientName: [''],
      clientEmail: [''],
      status: 'pending',
      clientAddress: this.address,
      createdAt: [''],
      paymentTerms: ['30'],
      paymentDue: [''],
      projectDescription: [''],
      items: this.fb.array([]),
      total: 0,
    });
  }

  @ViewChild('formContainer') formContainer: ElementRef | undefined;

  ngOnInit(): void {
    this.billingForm.valueChanges
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
      .subscribe((value) => (this.isBottom = value));
  }

  addItem(): void {
    const item = this.fb.group({
      name: [''],
      quantity: [''],
      price: [''],
      total: [0],
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
      .reduce((a, b) => a + b);

    this.total?.setValue(grandTotal);
  }

  getPaymentDueDate(): void {
    const date = this.createdAt?.value;
    const amount = this.paymentTerms?.value;
    const due = addDays(date, amount);

    this.paymentDue?.setValue(due, { onlySelf: true });
  }

  discardForm(): void {
    this.billingForm.reset();
    this.sidebarFormService.close();
  }

  saveAsDraft(): void {
    this.status?.setValue('draft');
    this.onSubmit();
  }

  onSubmit(): void {
    this.submitted = true;
    this.invoiceService.createInvoice(this.formData);
    this.billingForm.reset();
    this.sidebarFormService.close();
  }

  get formData() {
    return this.billingForm.value;
  }

  get total() {
    return this.billingForm.get('total');
  }

  get status() {
    return this.billingForm.get('status');
  }

  get createdAt() {
    return this.billingForm.get('createdAt');
  }

  get paymentDue() {
    return this.billingForm.get('paymentDue');
  }

  get paymentTerms() {
    return this.billingForm.get('paymentTerms');
  }

  get items() {
    return this.billingForm.get('items') as FormArray;
  }
}
