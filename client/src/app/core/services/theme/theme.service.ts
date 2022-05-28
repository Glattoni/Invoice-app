import { Injectable } from '@angular/core';
import { Theme, light, dark } from '@core/constants/themes';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private active: Theme;

  constructor(private localStorageService: LocalStorageService) {
    this.active = this.checkLocalStorage();
    this.setActiveTheme(this.active);
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  checkLocalStorage() {
    return this.localStorageService.getItem('theme') || light;
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
