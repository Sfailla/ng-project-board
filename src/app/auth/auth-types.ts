import { UrlTree } from '@angular/router'
import { Observable } from 'rxjs/internal/Observable'
import { User } from '@generated/types'

export enum AuthTitles {
  LOGIN = 'Sign Into',
  REGISTER = 'Sign Up For'
}

export enum RedirectTitles {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up'
}

export interface AuthUserInput {
  username?: string
  email: string
  password: string
  confirmPassword?: string
}

export interface AuthUser {
  token: string
  user: User
}

export type CanActivateReturnType =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree
