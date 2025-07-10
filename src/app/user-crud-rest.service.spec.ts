import { TestBed } from '@angular/core/testing';

import { UserCrudRestService } from './user-crud-rest.service';

describe('UserCrudRestService', () => {
  let service: UserCrudRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCrudRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
