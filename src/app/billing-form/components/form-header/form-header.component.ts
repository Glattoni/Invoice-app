import { CommonModule } from '@angular/common';
import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GoBackComponent } from '@shared/components/go-back/go-back.component';

@Component({
  selector: 'app-form-header',
  standalone: true,
  imports: [CommonModule, GoBackComponent],
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormHeaderComponent {
  @Input() public slug = '';
  @Input() public editMode = false;
  @Output() public goBack = new EventEmitter<void>();
}
