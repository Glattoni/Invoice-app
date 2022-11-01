import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Theme } from './theme.service.constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private activeTheme = new BehaviorSubject<Theme>(Theme.Light);
  public readonly activeTheme$ = this.activeTheme.asObservable();

  constructor(private readonly localStorageService: LocalStorageService) {
    this.activeTheme.next(this.preservedTheme || Theme.Light);
    this.activeTheme.pipe(distinctUntilChanged()).subscribe((value) => {
      this.localStorageService.setItem('theme', value);
    });
  }

  public get isDarkTheme(): boolean {
    return this.activeTheme.value === Theme.Dark;
  }

  private get preservedTheme(): Theme | null {
    return this.localStorageService.getItem('theme') as Theme;
  }

  public toggleTheme(): void {
    const nextTheme = this.isDarkTheme ? Theme.Light : Theme.Dark;
    this.activateTheme(nextTheme);
  }

  private activateTheme(theme: Theme): void {
    this.activeTheme.next(theme);
  }
}
