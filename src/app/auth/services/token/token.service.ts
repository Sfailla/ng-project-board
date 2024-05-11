import { Injectable, inject } from '@angular/core'
import { AuthUser, User } from '@generated/types'
import { LocalStorageKeys } from '@shared/types'
import { LocalStorageService } from '@shared/services'

@Injectable({ providedIn: 'root' })
export class TokenService {
  storage: LocalStorageService = inject(LocalStorageService)

  saveToken(token: string): void {
    this.storage.removeItem(LocalStorageKeys.AUTH_TOKEN)
    this.storage.setItem(LocalStorageKeys.AUTH_TOKEN, token)
  }

  saveUser(user: User): void {
    this.storage.removeItem(LocalStorageKeys.AUTH_USER)
    this.storage.setItem(LocalStorageKeys.AUTH_USER, JSON.stringify(user))
  }

  saveUserAndToken<T extends AuthUser>(response: T): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.saveToken(response.token)
        this.saveUser(response.user)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  getToken(): string | null {
    return this.storage.getItem(LocalStorageKeys.AUTH_TOKEN)
  }

  getUser(): User | null {
    const user = this.storage.getItem(LocalStorageKeys.AUTH_USER)
    return user !== null ? JSON.parse(user) : user
  }

  destroySession(): void {
    this.storage.removeItem(LocalStorageKeys.AUTH_TOKEN)
    this.storage.removeItem(LocalStorageKeys.AUTH_USER)
  }
}
