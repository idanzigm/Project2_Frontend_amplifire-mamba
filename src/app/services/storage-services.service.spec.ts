import { TestBed } from '@angular/core/testing';

import { StorageServicesService } from './storage-services.service';

describe('StorageServicesService', () => {
  let service: StorageServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
