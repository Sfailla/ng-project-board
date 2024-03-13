import { authRouteLockGuard } from './guards/auth-route-lock.guard'
import { LoginComponent, RegisterComponent } from './components'

export const AUTH_ROUTES = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authRouteLockGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authRouteLockGuard]
  }
]
