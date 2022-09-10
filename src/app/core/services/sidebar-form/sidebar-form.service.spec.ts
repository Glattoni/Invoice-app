import { TestBed } from '@angular/core/testing';

import { SidebarFormService } from './sidebar-form.service';

describe('SidebarFormService', () => {
  let service: SidebarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
