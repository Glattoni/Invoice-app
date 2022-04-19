import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarFormService {
  private visible = new BehaviorSubject<boolean>(false);
  readonly visible$ = this.visible.asObservable();

  open(): void {
    this.visible.next(true);
  }

  close(): void {
    this.visible.next(false);
  }
}
