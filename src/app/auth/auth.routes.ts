import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

export const AUTH_ROUTES = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]
