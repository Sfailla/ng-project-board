import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { User } from '../../../generated/types.graphql-gen'

const TOKEN_KEY = environment.authTokenKey
const USER_KEY = environment.authUserKey

@Injectable({ providedIn: 'root' })
export class TokenService {
  destroySession(): void {
    window.sessionStorage.clear()
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }

  saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  saveUserAndToken(user: User, token: string): void {
    this.saveToken(token)
    this.saveUser(user)
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY) || null
  }

  getUser(): User | null {
    const user = window.sessionStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  }
}
