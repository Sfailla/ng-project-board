import { authRouteLockGuard } from './guards/auth-route-lock.guard'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

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
