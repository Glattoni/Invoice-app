import { fromEvent } from 'rxjs';

import {
  Input,
  OnInit,
  Output,
  OnDestroy,
  Component,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { DialogService } from '@core/services/dialog/dialog.service';

@Component({
  selector: 'app-dialog-base',
  template: `
    <dialog [id]="id" (click)="onClick($event)" (close)="enableScrolling()">
      <div class="dialog-body">
        <ng-content></ng-content>
      </div>
    </dialog>
  `,
  styleUrls: ['./dialog-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBaseComponent implements OnInit, OnDestroy {
  @Input() public id = 'dialog';
  @Output() public animationEnd = new EventEmitter<void>();

  constructor(
    private readonly dialogService: DialogService,
    private readonly element: ElementRef<HTMLDialogElement>
  ) {}

  public ngOnInit(): void {
    if (!this.id) {
      throw new Error('Modal must have an id');
    }

    this.dialogService.addDialog(this);
  }

  public ngOnDestroy(): void {
    this.dialogService.removeDialog(this.id);
  }

  public get dialog() {
    return this.element.nativeElement.children[0] as HTMLDialogElement;
  }

  public onClick(event: MouseEvent): void {
    const { nodeName } = event.target as HTMLElement;

    this.dialog.setAttribute('closing', '');

    fromEvent(this.dialog, 'animationend', { once: true }).subscribe(() => {
      this.dialog.removeAttribute('closing');
      this.animationEnd.emit();
      nodeName === 'DIALOG' && this.dialog.close();
    });
  }

  public enableScrolling(): void {
    this.dialogService.toggleScrolling();
  }
}
