import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { InvoiceStatus } from '@shared/constants/invoice.constants';

export interface Address {
  street: FormControl<string>;
  city: FormControl<string>;
  postCode: FormControl<string>;
  country: FormControl<string>;
}

export interface ListItem {
  name: FormControl<string>;
  quantity: FormControl<number>;
  price: FormControl<number>;
  total: FormControl<number>;
}

export interface BillingForm {
  slug: FormControl<string>;
  status: FormControl<InvoiceStatus>;
  senderAddress: FormGroup<Address>;
  clientAddress: FormGroup<Address>;
  clientName: FormControl<string>;
  clientEmail: FormControl<string>;
  createdAt: FormControl<string>;
  paymentTerms: FormControl<number>;
  paymentDue: FormControl<string>;
  items: FormArray<FormGroup<ListItem>>;
  description: FormControl<string>;
  total: FormControl<number>;
}
