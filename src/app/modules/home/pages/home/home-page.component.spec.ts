import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomePageComponent } from './home-page.component';
import { PlaceholderComponent } from '@modules/home/components/placeholder/placeholder.component';
import { HeaderComponent } from '@modules/home/components/header/header.component';
import { SummaryPipe } from '@modules/home/pipes/summary/summary.pipe';
import { NonNullableFormBuilder } from '@angular/forms';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SummaryPipe,
        HeaderComponent,
        HomePageComponent,
        PlaceholderComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [NonNullableFormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
