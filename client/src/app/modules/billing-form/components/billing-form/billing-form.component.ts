import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  Subject,
  Observable,
  merge,
  filter,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { formatDate } from '@angular/common';
import { addDays, generateSlug } from 'src/utils';

import { Invoice, Item } from '@shared/models/invoice.model';
import { BillingForm, ListItem } from '../../models/billing-form.model';
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
    this.getPayload();
    this.generateFormGroup();
    this.patchFormValue();
    this.onFormValueChanges();
    this.onItemListValueChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDiscard(): void {
    this.valid = true;
    this.resetForm();
    this.sidebarFormService.close();
  }

  onCancel(): void {
    this.valid = true;
    this.resetForm();
    this.createdAt?.enable();
    this.sidebarFormService.finishEditing();
  }

  onSaveAsDraft(): void {
    this.status?.setValue('draft');
    this.onSubmit();
  }

  onSubmit(): void {
    this.validateForm();

    if (this.valid && this.formData) {
      this.invoiceService.createInvoice(this.formData);
      this.resetForm();
      this.sidebarFormService.close();
    }
  }

  onSaveChanges(invoiceId: string): void {
    this.validateForm();

    if (this.valid && this.formData) {
      this.invoiceService.updateInvoice(invoiceId, this.formData);
      this.resetForm();
      this.sidebarFormService.close();
    }
  }

  onScroll(value: boolean): void {
    this.scrolledToBottom = value;
  }

  private getPayload(): void {
    this.payload$ = this.sidebarFormService.payload$;
  }

  private generateFormGroup(): void {
    const slug = generateSlug();
    const senderAddress = this.generateAddressGroup();
    const clientAddress = this.generateAddressGroup();
    const creationDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const paymentDue = addDays(creationDate, 30);

    this.form = this.formBuilder.group({
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

  private onFormValueChanges(): void {
    if (this.createdAt && this.paymentTerms) {
      merge(this.createdAt.valueChanges, this.paymentTerms.valueChanges)
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.calculatePaymentDueDate();
        });
    }
  }

  private onItemListValueChanges(): void {
    this.items.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
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

  private resetForm(): void {
    this.form?.reset();
    this.items.clear();
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
