import { TestBed } from '@angular/core/testing';

import { LibrarycrudRestService } from './librarycrud-rest.service';

describe('LibrarycrudRestService', () => {
  let service: LibrarycrudRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrarycrudRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
