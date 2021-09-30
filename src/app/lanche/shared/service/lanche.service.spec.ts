import { TestBed } from '@angular/core/testing';

import { LancheService } from './lanche.service';

describe('LancheService', () => {
  let service: LancheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LancheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
