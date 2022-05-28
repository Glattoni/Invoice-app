import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { BillingFormComponent } from '@modules/billing-form/billing-form.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, SidebarComponent, BillingFormComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [FormBuilder, HttpClient, HttpHandler],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
