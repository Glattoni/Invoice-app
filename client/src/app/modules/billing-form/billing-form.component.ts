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

  onDiscard(): void {
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

  get items() {
    return this.form.get('items') as FormArray;
  }
}
