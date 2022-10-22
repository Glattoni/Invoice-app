import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAsPaidDialogComponent } from './mark-as-paid-dialog.component';

describe('MarkAsPaidDialogComponent', () => {
  let component: MarkAsPaidDialogComponent;
  let fixture: ComponentFixture<MarkAsPaidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkAsPaidDialogComponent],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAsPaidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
