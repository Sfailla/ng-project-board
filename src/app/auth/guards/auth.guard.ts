import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '@auth/services'
import { CanActivateReturnType } from '../auth-types'
import { Routes } from '../../shared/types/shared-types'

export const authGuard: CanActivateFn = (): CanActivateReturnType => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isAuthenticated() ? true : router.createUrlTree([Routes.LOGIN])
}
