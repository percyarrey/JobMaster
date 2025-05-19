import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accountTypeGuard } from './account-type.guard';

describe('accountTypeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accountTypeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
