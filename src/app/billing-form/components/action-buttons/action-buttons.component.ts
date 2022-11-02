import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonsComponent {
  @Input() public editMode = false;
  @Input() public reachedBottom = false;

  @Output() public cancel = new EventEmitter<void>();
  @Output() public discard = new EventEmitter<void>();
  @Output() public saveChanges = new EventEmitter<void>();
  @Output() public saveAsDraft = new EventEmitter<void>();
}
