import { TestBed } from '@angular/core/testing';

import { HousekeepersService } from './housekeepers.service';

describe('HousekeepersService', () => {
  let service: HousekeepersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousekeepersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
