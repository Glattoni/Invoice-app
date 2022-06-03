import { UntypedFormBuilder, FormGroupDirective } from '@angular/forms';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BillingFormComponent } from './billing-form.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { InvoiceTermsComponent } from './components/invoice-terms/invoice-terms.component';
import { SenderAddressComponent } from './components/sender-address/sender-address.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { GoBackButtonComponent } from '@modules/buttons/components/go-back-button/go-back-button.component';
import { ButtonComponent } from '@modules/buttons/components/button/button.component';

describe('BillingFormComponent', () => {
  let component: BillingFormComponent;
  let fixture: ComponentFixture<BillingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ButtonComponent,
        ItemsListComponent,
        ClientInfoComponent,
        CustomInputComponent,
        BillingFormComponent,
        GoBackButtonComponent,
        InvoiceTermsComponent,
        CustomSelectComponent,
        SenderAddressComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [UntypedFormBuilder, FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
