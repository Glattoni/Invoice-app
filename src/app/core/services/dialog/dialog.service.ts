import { fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DialogBaseComponent } from '@shared/components/dialog-base/dialog-base.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogs: DialogBaseComponent[] = [];

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public addDialog(dialog: any): void {
    this.dialogs.push(dialog);
  }

  public removeDialog(id: string): void {
    this.dialogs = this.dialogs.filter((dialog) => dialog.id !== id);
  }

  public getDialog(id: string): DialogBaseComponent | undefined {
    return this.dialogs.find((dialog) => dialog.id === id);
  }

  public openDialog(id: string): void {
    const dialog = this.getDialog(id);
    dialog?.dialog.showModal();
    this.toggleScrolling();
  }

  public closeDialog(id: string): void {
    const dialog = this.getDialog(id)?.dialog;

    if (dialog) {
      dialog.setAttribute('closing', '');

      fromEvent(dialog, 'animationend').subscribe(() => {
        dialog.removeAttribute('closing');
        dialog.close();
      });
    }

    this.toggleScrolling();
  }

  public toggleScrolling(): void {
    this.document.body.classList.toggle('modal-open');
  }
}
