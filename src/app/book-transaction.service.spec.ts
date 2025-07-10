import { TestBed } from '@angular/core/testing';

import { BookTransactionService } from './book-transaction.service';

describe('BookTransactionService', () => {
  let service: BookTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
