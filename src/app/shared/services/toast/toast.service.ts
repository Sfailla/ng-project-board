import { Injectable, signal } from '@angular/core'
import { ToastType } from '../../../shared-types'

export type ToastPosition = 'top' | 'bottom' | 'left' | 'right'
export type ToastVariant = 'error' | 'success' | 'info' | 'warning'
export type ToastAnimation = 'slide-out-right' | 'slide-out-left' | 'slide-up' | 'slide-down'
export type ToastInput = { variant: ToastVariant; message: string; config?: ToastConfig }
export type ToastConfig = {
  duration?: number
  position?: ToastPosition
  animation?: ToastAnimation
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  showToastMessage = signal<boolean>(false)
  toast = signal<ToastInput>({
    variant: ToastType.SUCCESS,
    message: '',
    config: { duration: 10000, position: 'top', animation: 'slide-out-right' }
  })

  public present(toastInput: ToastInput): void {
    this.toast.update(state => ({ ...state, ...toastInput }))
    this.showToastMessage.set(true)

    const duration = this.toast().config?.duration || 0

    if (duration > 0) this.handleToastDuration(duration)
  }

  private handleToastDuration(duration: number): void {
    setTimeout(() => this.dismiss(), duration)
  }

  public dismiss(): void {
    this.toast.update(state => ({ ...state, variant: ToastType.SUCCESS, message: '' }))
    this.showToastMessage.set(false)
  }
}
