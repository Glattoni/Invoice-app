import { Component, ElementRef } from '@angular/core';
import { ClickedOutsideDirective } from './clicked-outside.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `
    <div clickedOutside (clickOutside)="clickedOutside()">
      <button (click)="toggleVisibility()">menu title</button>
      <ul *ngIf="isVisible">
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
    </div>
  `,
})
class TestClickOutsideComponent {
  public isVisible = false;

  public toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  public clickedOutside(): void {
    this.isVisible = false;
  }
}

describe('Directive: ClickOutside', () => {
  let component: TestClickOutsideComponent;
  let fixture: ComponentFixture<TestClickOutsideComponent>;
  let nativeEl: ElementRef<HTMLDivElement>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestClickOutsideComponent, ClickedOutsideDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestClickOutsideComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new ClickedOutsideDirective(nativeEl, document);
    expect(directive).toBeTruthy();
  });

  it('should handle document click', () => {
    Reflect.defineProperty(component, 'isVisible', { value: true });
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.isVisible).toBeFalse();
  });
});
