import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { CanActivateReturnType } from '../types'

export const authRouteLockGuard: CanActivateFn = (): CanActivateReturnType => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAuthenticated()) {
    router.navigate(['dashboard'])
    return false
  } else {
    return true
  }
}
