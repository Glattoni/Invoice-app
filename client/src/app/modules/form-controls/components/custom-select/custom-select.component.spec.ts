import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentTermsPipe } from '@modules/form-controls/pipes/payment-terms.pipe';

import { CustomSelectComponent } from './custom-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomSelectComponent', () => {
  let component: CustomSelectComponent;
  let fixture: ComponentFixture<CustomSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSelectComponent, PaymentTermsPipe],
      imports: [BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
