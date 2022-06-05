import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  Subject,
  Observable,
  tap,
  merge,
  filter,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { formatDate } from '@angular/common';
import { addDays, generateSlug } from 'src/utils';

import { Invoice, Item } from '@shared/models/invoice.model';
import { BillingForm, ListItem } from './models/billing-form.model';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';

import {
  FormArray,
  FormGroup,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingFormComponent implements OnInit, OnDestroy {
  form?: FormGroup<BillingForm>;
  payload$?: Observable<Invoice>;

  valid: boolean = true;
  scrolledToBottom: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private invoiceService: InvoiceService,
    private sidebarFormService: SidebarFormService
  ) {}

  ngOnInit(): void {
    this.checkForPayload();
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
    this.valid = true;
    this.form?.reset();
    this.items.clear();
    this.sidebarFormService.close();
  }

  onCancel(): void {
    this.valid = true;
    this.form?.reset();
    this.items.clear();
    this.createdAt?.enable();
    this.sidebarFormService.finishEditing();
  }

  onSaveAsDraft(): void {
    this.status?.setValue('draft');
    this.onSubmit();
  }

  onSubmit(): void {
    this.validateForm();

    if (!this.valid) return;

    if (this.formData) {
      //TODO: infer proper formData type
      this.invoiceService.createInvoice(this.formData as any);
      this.form?.reset();
      this.sidebarFormService.close();
    }
  }

  onSaveChanges(invoiceId: string): void {
    this.validateForm();

    if (!this.valid) return;

    if (this.formData) {
      //TODO: infer proper formData type
      this.invoiceService.updateInvoice(invoiceId, this.formData as any);
      this.form?.reset();
      this.sidebarFormService.close();
    }
  }

  onScroll(value: boolean): void {
    this.scrolledToBottom = value;
  }

  private checkForPayload(): void {
    this.payload$ = this.sidebarFormService.payload$;
  }

  private generateFormGroup(): void {
    const slug = generateSlug();
    const senderAddress = this.generateAddressGroup();
    const clientAddress = this.generateAddressGroup();
    const creationDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const paymentDue = addDays(creationDate, 30);

    this.form = this.formBuilder.group({
      slug: slug,
      status: 'pending',
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
        this.form?.patchValue({
          slug: invoice.slug,
          status: invoice.status,
          senderAddress: invoice.senderAddress,
          clientAddress: invoice.clientAddress,
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail,
          createdAt: invoice.createdAt,
          paymentTerms: invoice.paymentTerms,
          paymentDue: invoice.paymentDue,
          description: invoice.description,
          total: invoice.total,
        });
        this.patchItemList(invoice.items);
        this.createdAt?.disable();
      });
  }

  private patchItemList(items: Item[]): void {
    this.items.clear();

    items.forEach((item) => {
      const listItem = this.formBuilder.group({
        name: [item.name, Validators.required],
        quantity: [item.quantity, Validators.required],
        price: [item.price, Validators.required],
        total: [item.total, Validators.required],
      });

      this.items.push(listItem);
    });
  }

  private trackFormValueChanges(): void {
    if (this.createdAt && this.paymentTerms) {
      merge(this.createdAt.valueChanges, this.paymentTerms.valueChanges).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.calculatePaymentDueDate();
        })
      );
    }
  }

  private trackItemListValueChanges(): void {
    this.items.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        //TODO: try to calculate without subscribing
        this.calculateAmountDue();
      });
  }

  private calculateAmountDue(): void {
    const amount = this.items.controls
      .map((control) => control.get('total')?.value)
      .filter((total): total is number => !!total)
      .reduce((total, current) => total + current, 0);

    this.total?.setValue(amount);
  }

  private calculatePaymentDueDate(): void {
    const date = this.createdAt?.value;
    const amount = this.paymentTerms?.value;

    if (date && amount) {
      const due = addDays(date, amount);
      this.paymentDue?.setValue(due);
    }
  }

  private validateForm(): void {
    this.form?.markAllAsTouched();
    this.valid = this.form?.invalid ? false : true;
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
    return this.form?.get('items') as FormArray<FormGroup<ListItem>>;
  }
}
