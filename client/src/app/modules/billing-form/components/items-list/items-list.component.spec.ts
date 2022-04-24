import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective } from '@angular/forms';

import { ItemsListComponent } from './items-list.component';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsListComponent],
      providers: [FormGroupDirective, FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
