import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { BillingFormComponent } from '@modules/billing-form/components/billing-form/billing-form.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, SidebarComponent, BillingFormComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [UntypedFormBuilder, HttpClient, HttpHandler],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
