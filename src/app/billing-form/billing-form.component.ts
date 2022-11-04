import {
  map,
  take,
  merge,
  filter,
  Subject,
  startWith,
  switchMap,
  takeUntil,
  Observable,
  debounceTime,
  combineLatest,
  distinctUntilChanged,
} from 'rxjs';

import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Invoice, Item } from '@shared/models/invoice.model';
import { fadeInOut, slideInOut } from '@shared/animations';

import { InvoiceService } from 'app/services/invoice/invoice.service';
import { BillingFormService } from 'app/services/billing-form/billing-form.service';

import { BillingForm, ListItem } from './models/billing-form.model';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { SenderAddressComponent } from './components/sender-address/sender-address.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { InvoiceTermsComponent } from './components/invoice-terms/invoice-terms.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { ScrolledToBottomDirective } from './directives/scrolled-to-bottom.directive';

@Component({
  selector: 'app-billing-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormHeaderComponent,
    SenderAddressComponent,
    ClientInfoComponent,
    InvoiceTermsComponent,
    ItemsListComponent,
    ActionButtonsComponent,
    ScrolledToBottomDirective,
  ],
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

  private readonly destroy$ = new Subject<void>();

  public readonly viewModel$ = combineLatest([
    this.billingFormService.editMode$,
    this.billingFormService.visible$,
    this.invoiceService.invoice$.pipe(startWith({} as Invoice)),
  ]).pipe(
    map(([editMode, visible, invoice]) => ({ editMode, visible, invoice })),
    takeUntil(this.destroy$)
  );

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly billingFormService: BillingFormService
  ) {
    this.form = billingFormService.formControls;
    this.editMode$ = billingFormService.editMode$;
    this.visible$ = billingFormService.visible$;
    this.invoice$ = invoiceService.invoice$;
  }

  public get items(): FormArray<FormGroup<ListItem>> {
    return this.form.get('items') as FormArray<FormGroup<ListItem>>;
  }

  public get animationState$(): Observable<string> {
    return this.visible$.pipe(
      map((visible) => (visible ? 'open' : 'close')),
      takeUntil(this.destroy$)
    );
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
        this.patchItemsList(invoice.items);
      });
  }

  private patchItemsList(items: Item[]): void {
    this.items.clear();
    for (const item of items) {
      this.items.push(this.billingFormService.generateListItem(item));
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
