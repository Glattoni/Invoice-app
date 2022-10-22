import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { BillingFormComponent } from '@modules/billing-form/billing-form.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, SidebarComponent, BillingFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [UntypedFormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
