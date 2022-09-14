import { TestBed } from '@angular/core/testing';

import { AuthProtectGuard } from './auth-protect.guard';

describe('AuthProtectGuard', () => {
  let guard: AuthProtectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthProtectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
