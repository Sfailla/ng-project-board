import { authRouteLockGuard } from './guards'
import { LoginComponent, RegisterComponent } from './pages'

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
