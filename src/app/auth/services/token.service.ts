import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { User } from '../../../generated/types.graphql-gen'

const TOKEN_KEY = environment.authTokenKey
const USER_KEY = environment.authUserKey

@Injectable({ providedIn: 'root' })
export class TokenService {
  destroySession(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.setItem(TOKEN_KEY, token)
  }

  saveUser(user: User): void {
    localStorage.removeItem(USER_KEY)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  saveUserAndToken(user: User, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.saveToken(token)
        this.saveUser(user)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || null
  }

  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  }
}
