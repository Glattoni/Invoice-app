import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeExperimentalService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme', () => {
    service.toggleTheme();
    expect(service.isDarkTheme).toBeTruthy();

    service.toggleTheme();
    expect(service.isDarkTheme).toBeFalsy();
  });
});
