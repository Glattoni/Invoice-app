import { Observable } from 'rxjs';
import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Invoice } from '@shared/models/invoice.model';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormHeaderComponent {
  @Input() public payload$?: Observable<Invoice>;
  @Output() public goBack = new EventEmitter<void>();
}
