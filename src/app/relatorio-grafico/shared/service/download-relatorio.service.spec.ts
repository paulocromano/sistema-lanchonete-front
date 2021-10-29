import { TestBed } from '@angular/core/testing';

import { DownloadRelatorioService } from './download-relatorio.service';

describe('DownloadRelatorioService', () => {
  let service: DownloadRelatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadRelatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
