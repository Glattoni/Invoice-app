import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, map, Subscription } from 'rxjs';
import { ModalService } from '@core/services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string = 'custom-modal-1';

  private element: any;
  private subscription?: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalService: ModalService,
    private el: ElementRef
  ) {
    this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      throw new Error('Modal must have an id');
    }

    this.document.body.appendChild(this.element);

    this.subscription = fromEvent(this.element, 'click')
      .pipe(map((event: any) => event.target.className === 'modal'))
      .subscribe((value) => {
        value && this.close();
      });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.element.remove();
    this.modalService.remove(this.id);
    this.subscription?.unsubscribe();
  }

  open(): void {
    this.element.style.display = 'block';
    this.document.body.classList.add('modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    this.document.body.classList.remove('modal-open');
  }
}
