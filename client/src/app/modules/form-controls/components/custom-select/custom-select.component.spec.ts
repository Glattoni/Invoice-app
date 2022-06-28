import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentTermsPipe } from '@modules/form-controls/pipes/payment-terms.pipe';

import { CustomSelectComponent } from './custom-select.component';

describe('CustomSelectComponent', () => {
  let component: CustomSelectComponent;
  let fixture: ComponentFixture<CustomSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSelectComponent, PaymentTermsPipe],
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
