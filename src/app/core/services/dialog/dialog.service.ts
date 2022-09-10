import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { fromEvent } from 'rxjs';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogs: DialogComponent[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  addDialog(dialog: any): void {
    this.dialogs.push(dialog);
  }

  removeDialog(id: string): void {
    this.dialogs = this.dialogs.filter((dialog) => dialog.id !== id);
  }

  getDialog(id: string) {
    return this.dialogs.find((dialog) => dialog.id === id);
  }

  openDialog(id: string): void {
    const dialog = this.getDialog(id);
    dialog?.dialog.showModal();
    this.toggleScrolling();
  }

  closeDialog(id: string): void {
    const dialog = this.getDialog(id)?.dialog;

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
