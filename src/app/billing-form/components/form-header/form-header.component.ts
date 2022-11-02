import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormHeaderComponent {
  @Input() public slug = '';
  @Input() public editMode = false;
  @Output() public goBack = new EventEmitter<void>();
}
