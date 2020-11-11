import { TestBed } from '@angular/core/testing';

import { FetchIaglService } from './fetch-iagl.service';

describe('FetchIaglService', () => {
  let service: FetchIaglService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchIaglService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
