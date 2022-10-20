import { NonNullableFormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

class BillingFormServiceStub {
  public open = jasmine.createSpy();
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, DropdownComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        NonNullableFormBuilder,
        { provide: BillingFormService, useClass: BillingFormServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open sidebar on "New" button click', () => {
    component.openSidebar();
    fixture.detectChanges();
    expect(component['billingFormService'].open).toHaveBeenCalled();
  });
});
