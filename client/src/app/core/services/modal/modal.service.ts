import { Injectable } from '@angular/core';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: DialogComponent[] = [];

  add(modal: any): void {
    this.modals.push(modal);
  }

  remove(id: string): void {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  open(id: string): void {
    const modal = this.modals.find((modal) => modal.id === id);
    modal?.dialog.showModal();
  }

  close(id: string): void {
    const modal = this.modals.find((modal) => modal.id === id);
    modal?.dialog.close();
  }
}
