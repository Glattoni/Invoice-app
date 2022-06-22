import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = new BehaviorSubject<'light' | 'dark'>('light');
  readonly theme$ = this.theme.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.theme.next(this.preservedTheme);
  }

  toggleTheme(): void {
    this.isDarkTheme ? this.setLightTheme() : this.setDarkTheme();
  }

  private setDarkTheme(): void {
    this.theme.next('dark');
    this.localStorageService.setItem('theme', 'dark');
  }

  private setLightTheme(): void {
    this.theme.next('light');
    this.localStorageService.setItem('theme', 'light');
  }

  get activeTheme() {
    return this.theme.value;
  }

  get isDarkTheme() {
    return this.theme.value === 'dark';
  }

  get preservedTheme() {
    return this.localStorageService.getItem('theme') || 'light';
  }
}
