import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentTermsPipe } from '@modules/form-controls/pipes/payment-terms.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectInputComponent } from './select-input.component';

describe('CustomSelectComponent', () => {
  let component: SelectInputComponent;
  let fixture: ComponentFixture<SelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectInputComponent, PaymentTermsPipe],
      imports: [BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
