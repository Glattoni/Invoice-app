import { Component, Input } from '@angular/core';
import { Invoice } from '@shared/models/invoice.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
})
export class FormHeaderComponent {
  @Input() payload$?: Observable<Invoice>;
}
