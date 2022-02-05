import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '@shared/services/modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() state?: String;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  openModal(id: string) {
    this.modalService.open(id);
  }
}
