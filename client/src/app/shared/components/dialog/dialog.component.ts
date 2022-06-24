import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '@core/services/modal/modal.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() id: string = 'dialog';

  constructor(
    private modalService: ModalService,
    private element: ElementRef<HTMLDialogElement>
  ) {}

  ngOnInit(): void {
    if (!this.id) {
      throw new Error('Modal must have an id');
    }

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
  }

  onClick(event: MouseEvent): void {
    const rect = this.dialog.getBoundingClientRect();
    const insideDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    !insideDialog && this.dialog.close();
  }

  enableScrolling(): void {
    this.modalService.toggleScrolling();
  }

  get dialog() {
    return this.element.nativeElement.children[0] as HTMLDialogElement;
  }
}
