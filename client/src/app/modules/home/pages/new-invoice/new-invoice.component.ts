import { Observable } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { PortalService } from '../../services/portal/portal.service';
import { BillingFormComponent } from 'src/app/modules/billing-form/billing-form.component';

@Component({
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
