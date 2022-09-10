import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAsPaidDialogComponent } from './mark-as-paid-dialog.component';

describe('MarkAsPaidDialogComponent', () => {
  let component: MarkAsPaidDialogComponent;
  let fixture: ComponentFixture<MarkAsPaidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkAsPaidDialogComponent],
      imports: [HttpClientModule],
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
