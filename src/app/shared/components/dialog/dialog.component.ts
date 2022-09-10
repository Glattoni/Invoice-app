import { fromEvent } from 'rxjs';

import {
  Input,
  OnInit,
  Output,
  OnDestroy,
  Component,
  ElementRef,
  EventEmitter,
} from '@angular/core';

import { DialogService } from '@core/services/dialog/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() id: string = 'dialog';
  @Output() animationEnd = new EventEmitter<void>();

  constructor(
    private dialogService: DialogService,
    private element: ElementRef<HTMLDialogElement>
  ) {}

  ngOnInit(): void {
    if (!this.id) {
      throw new Error('Modal must have an id');
    }

    this.dialogService.addDialog(this);
  }

  ngOnDestroy(): void {
    this.dialogService.removeDialog(this.id);
  }

  onClick(event: MouseEvent): void {
    const { nodeName } = event.target as HTMLElement;

    this.dialog.setAttribute('closing', '');

    fromEvent(this.dialog, 'animationend', { once: true }).subscribe(() => {
      this.dialog.removeAttribute('closing');
      this.animationEnd.emit();
      nodeName === 'DIALOG' && this.dialog.close();
    });
  }

  enableScrolling(): void {
    this.dialogService.toggleScrolling();
  }

  get dialog() {
    return this.element.nativeElement.children[0] as HTMLDialogElement;
  }
}
