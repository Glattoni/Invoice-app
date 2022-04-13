import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  visible$: Observable<boolean>;

  constructor(private sidebarFormService: SidebarFormService) {
    this.visible$ = this.sidebarFormService.visible$;
  }

  closeSidebar(): void {
    this.sidebarFormService.close();
  }
}
