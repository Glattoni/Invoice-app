import { Injectable } from '@angular/core';
import { Theme, light, dark } from '@core/constants/themes';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private active: Theme;

  constructor(private localStorageService: LocalStorageService) {
    this.active = this.checkLocalStorage() || light;
    this.setActiveTheme(this.active);
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  checkLocalStorage() {
    const theme = this.localStorageService.getItem('theme');
    if (!theme) return light;
    return JSON.parse(theme);
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
    this.localStorageService.setItem('theme', dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
    this.localStorageService.setItem('theme', light);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;
    const documentStyle = document.documentElement.style;

    Object.keys(this.active.properties).forEach((prop) => {
      documentStyle.setProperty(prop, this.active.properties[prop]);
    });
  }
}
