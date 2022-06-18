import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
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

  constructor(@Inject(DOCUMENT) private document: Document) {}

  open(): void {
    this.visible.next(true);
    this.document.body.classList.add('form-open');
  }

  close(): void {
    this.visible.next(false);
    this.document.body.classList.remove('form-open');
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
