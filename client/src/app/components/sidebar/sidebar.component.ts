import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  setThemeIcon(): string {
    if (this.themeService.isDarkTheme()) {
      return 'assets/icons/icon-sun.svg';
    }
    return 'assets/icons/icon-moon.svg';
  }

  toggleTheme(): void {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }
}
