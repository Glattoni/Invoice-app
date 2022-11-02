import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should invoke onClick function on label click', () => {
    Reflect.defineProperty(component, 'value', { value: 'draft' });
    Reflect.defineProperty(component, 'label', { value: 'status' });

    const clickSpy = spyOn(component, 'onClick');
    const checkbox = debugElement.query(By.css('.checkbox'));

    checkbox.triggerEventHandler('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});
