import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective } from '@angular/forms';

import { ClientInfoComponent } from './client-info.component';

describe('ClientInfoComponent', () => {
  let component: ClientInfoComponent;
  let fixture: ComponentFixture<ClientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientInfoComponent],
      providers: [FormGroupDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
