import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'
import { CanActivateReturnType } from '../auth-types'

export const authRouteLockGuard: CanActivateFn = (): CanActivateReturnType => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isAuthenticated() ? router.createUrlTree(['dashboard']) : true
}
