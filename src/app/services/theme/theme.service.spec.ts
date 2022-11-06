import { BehaviorSubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { Theme } from './theme.service.constants';

describe('ThemeExperimentalService', () => {
  let service: ThemeService;

  beforeEach(() => {
    service = TestBed.inject(ThemeService);
  });

  it('should toggle active theme', (done) => {
    const theme = new BehaviorSubject(Theme.Light);
    Reflect.defineProperty(service, 'activeTheme', { value: theme });

    service.toggle();

    service['activeTheme'].subscribe((theme) => {
      expect(theme).toBe(Theme.Dark);
      done();
    });
  });
});
