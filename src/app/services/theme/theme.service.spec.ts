import { BehaviorSubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { Theme } from './theme.service.constants';

describe('ThemeExperimentalService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should toggle active theme', (done) => {
    Reflect.defineProperty(service, 'activeTheme', {
      value: new BehaviorSubject(Theme.Light),
    });
    service.toggleTheme();
    service['activeTheme'].subscribe((theme) => {
      expect(theme).toBe(Theme.Dark);
      done();
    });
  });
});