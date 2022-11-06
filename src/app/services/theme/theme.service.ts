import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Theme } from './theme.service.constants';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly activeTheme = new BehaviorSubject<Theme>(this.selectedTheme);
  public readonly activeTheme$ = this.activeTheme.asObservable();

  constructor(private readonly localStorageService: LocalStorageService) {}

  public get selectedTheme(): Theme {
    return this.savedTheme || Theme.Light;
  }

  public get isDarkTheme(): boolean {
    return this.activeTheme.value === Theme.Dark;
  }

  private get savedTheme(): Theme | null {
    return this.localStorageService.getItem('theme') as Theme;
  }

  public toggle(): void {
    const theme = this.isDarkTheme ? Theme.Light : Theme.Dark;

    this.activeTheme.next(theme);
    this.localStorageService.setItem('theme', theme);
  }
}
