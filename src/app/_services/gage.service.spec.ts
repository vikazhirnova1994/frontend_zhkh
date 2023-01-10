import { TestBed } from '@angular/core/testing';

import { GageService } from './gage.service';

describe('GageService', () => {
  let service: GageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
