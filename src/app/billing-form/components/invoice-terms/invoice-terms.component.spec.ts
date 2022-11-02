import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective, NonNullableFormBuilder } from '@angular/forms';

import { InvoiceTermsComponent } from './invoice-terms.component';

describe('InvoiceTermsComponent', () => {
  let component: InvoiceTermsComponent;
  let fixture: ComponentFixture<InvoiceTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceTermsComponent],
      providers: [FormGroupDirective, NonNullableFormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
