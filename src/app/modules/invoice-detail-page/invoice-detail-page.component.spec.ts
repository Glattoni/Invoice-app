import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InvoiceDetailPageComponent } from './invoice-detail-page.component';
import { GoBackComponent } from '@shared/components/go-back/go-back.component';

describe('InvoiceDetailPageComponent', () => {
  let component: InvoiceDetailPageComponent;
  let fixture: ComponentFixture<InvoiceDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoBackComponent, InvoiceDetailPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [NonNullableFormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
