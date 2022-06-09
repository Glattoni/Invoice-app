import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormGroupDirective, NonNullableFormBuilder } from '@angular/forms';

import { BillingFormComponent } from './billing-form.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { InvoiceTermsComponent } from './components/invoice-terms/invoice-terms.component';
import { SenderAddressComponent } from './components/sender-address/sender-address.component';

import { ButtonComponent } from '@modules/buttons/components/button/button.component';
import { GoBackButtonComponent } from '@modules/buttons/components/go-back-button/go-back-button.component';

describe('BillingFormComponent', () => {
  let component: BillingFormComponent;
  let fixture: ComponentFixture<BillingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ButtonComponent,
        ItemsListComponent,
        ClientInfoComponent,
        BillingFormComponent,
        GoBackButtonComponent,
        InvoiceTermsComponent,
        SenderAddressComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [FormGroupDirective, NonNullableFormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: fix later, hopefully
  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
