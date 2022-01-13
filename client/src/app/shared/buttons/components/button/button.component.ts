import { Component, Input, OnInit } from '@angular/core';
import { Variant } from '../../types/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() withIcon?: boolean;
  @Input() variant?: Variant;

  constructor() {}

  ngOnInit(): void {}
}
