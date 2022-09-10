import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective } from '@angular/forms';

import { SenderAddressComponent } from './sender-address.component';

describe('SenderAddressComponent', () => {
  let component: SenderAddressComponent;
  let fixture: ComponentFixture<SenderAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SenderAddressComponent],
      providers: [FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
