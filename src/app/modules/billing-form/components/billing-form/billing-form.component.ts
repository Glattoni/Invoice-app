import {
  Subject,
  Observable,
  merge,
  filter,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  combineLatest,
  map,
  startWith,
  take,
} from 'rxjs';

import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { Invoice, Item } from '@shared/models/invoice.model';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

import { BillingForm, ListItem } from '../../models/billing-form.model';
import { fadeInOut, slideInOut } from './billing-form.animations';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
  animations: [slideInOut, fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingFormComponent implements OnInit, OnDestroy {
  public form: FormGroup<BillingForm>;
  public editMode$: Observable<boolean>;
  public visible$: Observable<boolean>;
  public invoice$: Observable<Invoice>;

  public valid = true;
  public reachedBottom = false;

  public readonly viewModel$ = combineLatest([
    this.billingFormService.editMode$,
    this.billingFormService.visible$,
    this.invoiceService.invoice$.pipe(startWith({} as Invoice)),
  ]).pipe(
    map(([editMode, visible, invoice]) => ({ editMode, visible, invoice }))
  );

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly billingFormService: BillingFormService
  ) {
    this.form = billingFormService.formControls;
    this.editMode$ = billingFormService.editMode$;
    this.visible$ = billingFormService.visible$;
    this.invoice$ = invoiceService.invoice$;
  }

  public get items() {
    return this.form.get('items') as FormArray<FormGroup<ListItem>>;
  }

  public ngOnInit(): void {
    this.patchFormValue();
    this.onFormValueChanges();
    this.onItemListValueChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onDiscard(): void {
    this.valid = true;
    this.resetForm();
    this.billingFormService.close();
  }

  public onCancel(): void {
    this.valid = true;
    this.resetForm();
    this.billingFormService.finishEditing();
  }

  public onOverlayClick(): void {
    this.editMode$
      .pipe(
        take(1),
        map((value) => !!value),
        takeUntil(this.destroy$)
      )
      .subscribe((editMode) => {
        editMode ? this.onCancel() : this.onDiscard();
      });
  }

  public onSaveAsDraft(): void {
    this.status?.setValue('draft');
    this.onSubmit();
  }

  public onGoBack(): void {
    this.billingFormService.close();
  }

  public onSubmit(): void {
    this.validateForm();

    if (this.valid) {
      this.invoiceService.createInvoice(this.formData);
      this.resetForm();
      this.billingFormService.close();
    }
  }

  public onSaveChanges(invoiceId: string): void {
    this.validateForm();

    if (this.valid) {
      this.invoiceService.updateInvoice(invoiceId, this.formData);
      this.resetForm();
      this.billingFormService.close();
    }
  }

  public onScroll(value: boolean): void {
    this.reachedBottom = value;
  }

  private patchFormValue(): void {
    this.editMode$
      .pipe(
        filter((value) => !!value),
        switchMap(() => this.invoice$)
      )
      .subscribe((invoice) => {
        this.form.patchValue({
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
      });
  }

  private patchItemList(items: Item[]): void {
    this.items.clear();

    for (const item of items) {
      const listItem = this.billingFormService.generateListItem(item);
      this.items.push(listItem);
    }
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
      .map((control) => control.get('total')?.value || 0)
      .reduce((total, current) => total + current, 0);

    this.total?.setValue(amount);
  }

  private calculatePaymentDueDate(): void {
    const date = this.createdAt?.value || '';
    const amount = this.paymentTerms?.value || 0;
    const due = this.billingFormService.getPaymentDue(date, { days: amount });

    this.paymentDue?.setValue(due);
  }

  private validateForm(): void {
    this.form.markAllAsTouched();
    this.valid = this.form.valid;
  }

  private resetForm(): void {
    this.form.reset();
    this.items.clear();
  }

  private get formData() {
    return this.form.getRawValue();
  }

  private get total() {
    return this.form.get('total');
  }

  private get status() {
    return this.form.get('status');
  }

  private get createdAt() {
    return this.form.get('createdAt');
  }

  private get paymentDue() {
    return this.form.get('paymentDue');
  }

  private get paymentTerms() {
    return this.form.get('paymentTerms');
  }
}
