import { Injectable } from '@angular/core'
import { LocalStorageService } from '@shared/services'

@Injectable({ providedIn: 'root' })
export class LocalStorageServiceMock extends LocalStorageService {
  private storage = new Map<string, string>()

  override getItem(key: string): string | null {
    return this.storage.get(key) || null
  }

  override setItem(key: string, value: string): void {
    this.storage.set(key, value)
  }

  override removeItem(key: string): void {
    this.storage.delete(key)
  }

  override clear(): void {
    this.storage.clear()
  }
}
