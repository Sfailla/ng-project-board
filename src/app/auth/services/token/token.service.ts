import { Injectable } from '@angular/core'
import { User } from '@generated/types'
import { LocalStorageKeys } from '@shared/types'

@Injectable({ providedIn: 'root' })
export class TokenService {
  destroySession(): void {
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN)
    localStorage.removeItem(LocalStorageKeys.AUTH_USER)
  }

  saveToken(token: string): void {
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN)
    localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token)
  }

  saveUser(user: User): void {
    localStorage.removeItem(LocalStorageKeys.AUTH_USER)
    localStorage.setItem(LocalStorageKeys.AUTH_USER, JSON.stringify(user))
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
    return localStorage.getItem(LocalStorageKeys.AUTH_TOKEN)
  }

  getUser(): User | null {
    const user = localStorage.getItem(LocalStorageKeys.AUTH_USER)
    return user !== null ? JSON.parse(user) : user
  }
}
