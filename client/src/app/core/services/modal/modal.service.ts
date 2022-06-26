import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { fromEvent } from 'rxjs';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: DialogComponent[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  addModal(modal: any): void {
    this.modals.push(modal);
  }

  removeModal(id: string): void {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  getModal(id: string) {
    return this.modals.find((modal) => modal.id === id);
  }

  openModal(id: string): void {
    const modal = this.getModal(id);
    modal?.dialog.showModal();
    this.toggleScrolling();
  }

  closeModal(id: string): void {
    const dialog = this.getModal(id)?.dialog;

    if (dialog) {
      dialog.setAttribute('closing', '');

      fromEvent(dialog, 'animationend', { once: true }).subscribe(() => {
        dialog.removeAttribute('closing');
        dialog.close();
      });
    }
  }

  toggleScrolling(): void {
    this.document.body.classList.toggle('modal-open');
  }
}
