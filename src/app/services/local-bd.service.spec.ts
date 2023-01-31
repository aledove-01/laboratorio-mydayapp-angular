import { TestBed } from '@angular/core/testing';

import { LocalBDService } from './local-bd.service';

describe('LocalBDService', () => {
  let service: LocalBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
