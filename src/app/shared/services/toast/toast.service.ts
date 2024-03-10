import { Injectable, signal } from '@angular/core'
import { ToastInput, ToastType } from '../../../shared-types'

@Injectable({ providedIn: 'root' })
export class ToastService {
  showToastMessage = signal<boolean>(false)
  toast = signal<ToastInput>({
    variant: ToastType.SUCCESS,
    message: '',
    config: { duration: 10000, position: 'top', animation: 'slide-out-right' }
  })

  present(toastInput: ToastInput): void {
    this.toast.update(state => ({ ...state, ...toastInput }))
    this.showToastMessage.set(true)

    const duration = this.toast().config?.duration || 0

    if (duration > 0) this.handleToastDuration(duration)
  }

  private handleToastDuration(duration: number): void {
    setTimeout(() => {
      this.dismiss()
    }, duration)
  }

  dismiss(): void {
    this.toast.update(state => ({ ...state, variant: ToastType.SUCCESS, message: '' }))
    this.showToastMessage.set(false)
  }
}
