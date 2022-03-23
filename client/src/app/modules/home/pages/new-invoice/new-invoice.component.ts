import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { BillingFormComponent } from '@core/components/billing-form/billing-form.component';
import { PortalService } from '../../services/portal/portal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
})
export class NewInvoiceComponent implements AfterViewInit {
  componentPortal: ComponentPortal<BillingFormComponent>;
  portal$: Observable<any>;

  constructor(
    private portalService: PortalService,
    private cd: ChangeDetectorRef
  ) {
    this.componentPortal = new ComponentPortal(BillingFormComponent);
    this.portal$ = this.portalService.portal$;
  }

  ngAfterViewInit(): void {
    this.portalService.setPortal(this.componentPortal);
    this.cd.detectChanges();
  }
}
