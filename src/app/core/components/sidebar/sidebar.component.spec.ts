import { of } from 'rxjs';

import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { Theme } from '@core/services/theme/theme.service.constants';
import { SidebarComponent } from './sidebar.component';

const sun = '.panel__theme-icon--sun';
const moon = '.panel__theme-icon--moon';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should display moon icon if ative theme is light', () => {
    Reflect.defineProperty(component, 'activeTheme$', {
      value: of(Theme.Light),
    });
    fixture.detectChanges();
    const themeIcon = debugElement.query(By.css(moon));
    expect(themeIcon).toBeTruthy();
  });

  it('should display sun icon if ative theme is dark', () => {
    Reflect.defineProperty(component, 'activeTheme$', {
      value: of(Theme.Dark),
    });
    fixture.detectChanges();
    const themeIcon = debugElement.query(By.css(sun));
    expect(themeIcon).toBeTruthy();
  });
});
