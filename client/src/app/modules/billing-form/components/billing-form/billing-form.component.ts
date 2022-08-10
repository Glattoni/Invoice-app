import {
  Subject,
  Observable,
  merge,
  filter,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  state,
  style,
  trigger,
  animate,
  transition,
} from '@angular/animations';

import { FormArray, FormGroup } from '@angular/forms';

import { BillingForm, ListItem } from '../../models/billing-form.model';

import { Invoice, Item } from '@shared/models/invoice.model';

import { InvoiceService } from '@core/services/invoice/invoice.service';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'none',
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
          transform: 'translateX(-100%)',
        })
      ),
      transition('open => *', [animate('300ms ease-in')]),
      transition('* => open', [animate('300ms ease-out')]),
    ]),
    trigger('fadeInOut', [
      state(
        'open',
        style({
          zIndex: 'var(--z-overlay)',
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          zIndex: -1,
          opacity: 0,
        })
      ),
      transition('open => *', [animate('300ms ease-in')]),
      transition('* => open', [animate('300ms ease-out')]),
    ]),
  ],
})
export class BillingFormComponent implements OnInit, OnDestroy {
  form?: FormGroup<BillingForm>;
  payload$?: Observable<Invoice>;
  visible$?: Observable<boolean>;

  valid = true;
  reachedBottom = false;

  private destroyed$ = new Subject<void>();

  constructor(
    private invoiceService: InvoiceService,
    private formService: BillingFormService
  ) {}

  ngOnInit(): void {
    this.initProperties();
    this.generateForm();
    this.patchFormValue();
    this.onFormValueChanges();
    this.onItemListValueChanges();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onDiscard(): void {
    this.valid = true;
    this.resetForm();
    this.formService.close();
  }

  onCancel(): void {
    this.valid = true;
    this.resetForm();
    this.createdAt?.enable();
    this.formService.finishEditing();
  }

  onOverlayClick(): void {
    this.payload$ ? this.onCancel() : this.onDiscard();
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
      this.formService.close();
    }
  }

  onSaveChanges(invoiceId: string): void {
    this.validateForm();

    if (this.valid && this.formData) {
      this.invoiceService.updateInvoice(invoiceId, this.formData);
      this.resetForm();
      this.createdAt?.enable();
      this.formService.close();
    }
  }

  onScroll(value: boolean): void {
    this.reachedBottom = value;
  }

  private initProperties(): void {
    this.visible$ = this.formService.visible$;
    this.payload$ = this.formService.payload$;
  }

  private generateForm() {
    this.form = this.formService.generateFormGroup();
  }

  private patchFormValue(): void {
    this.payload$
      ?.pipe(
        filter((payload) => payload !== null),
        takeUntil(this.destroyed$)
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

    for (const item of items) {
      const listItem = this.formService.generateListItem(item);
      this.items.push(listItem);
    }
  }

  private onFormValueChanges(): void {
    if (this.createdAt && this.paymentTerms) {
      merge(this.createdAt.valueChanges, this.paymentTerms.valueChanges)
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          takeUntil(this.destroyed$)
        )
        .subscribe(() => {
          this.calculatePaymentDueDate();
        });
    }
  }

  private onItemListValueChanges(): void {
    this.items.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      )
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
    const due = this.formService.getPaymentDue(date, { days: amount });

    this.paymentDue?.setValue(due);
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
