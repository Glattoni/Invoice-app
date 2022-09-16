import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective, NonNullableFormBuilder } from '@angular/forms';
import { ButtonComponent } from '@modules/buttons/components/button/button.component';

import { ItemsListComponent } from './items-list.component';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsListComponent, ButtonComponent],
      providers: [FormGroupDirective, NonNullableFormBuilder],
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