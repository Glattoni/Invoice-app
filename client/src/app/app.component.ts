import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  visible$?: Observable<boolean>;

  constructor(private sidebarFormService: SidebarFormService) {}

  ngOnInit(): void {
    this.visible$ = this.sidebarFormService.visible$;
  }

  closeSidebar(): void {
    this.sidebarFormService.close();
  }
}
