import { Component, ElementRef } from '@angular/core';
import { ClickedOutsideDirective } from './clicked-outside.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-test-click-outside-directive',
  template: `
    <div clickedOutside (clickOutside)="clickedOutside()">
      <button (click)="toggleVisibility()">menu title</button>
      <ul *ngIf="isVisible">
        <li>item one</li>
        <li>item two</li>
        <li>item three</li>
      </ul>
    </div>
  `,
})
class TestClickOutsideComponent {
  isVisible: boolean = false;

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  clickedOutside(): void {
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
    component.isVisible = true;
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.isVisible).toBe(false);
  });
});
