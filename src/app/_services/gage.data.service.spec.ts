import { TestBed } from '@angular/core/testing';

import { GageDataService } from './gage.data.service';

describe('GageDataService', () => {
  let service: GageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
