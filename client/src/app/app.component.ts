import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  theme$?: Observable<'light' | 'dark'>;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme$ = this.themeService.theme$;
  }
}
