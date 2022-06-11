import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Invoice } from '@shared/models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class SidebarFormService {
  private visible = new BehaviorSubject<boolean>(false);
  private payload = new ReplaySubject<Invoice>();

  readonly visible$ = this.visible.asObservable();
  readonly payload$ = this.payload.asObservable();

  open(): void {
    this.visible.next(true);
  }

  close(): void {
    this.visible.next(false);
  }

  openForEditing(invoice: Invoice): void {
    this.payload.next(invoice);
    this.open();
  }

  finishEditing(): void {
    this.payload.next(null as any);
    this.close();
  }
}
