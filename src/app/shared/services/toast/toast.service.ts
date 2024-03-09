import { Injectable, signal } from '@angular/core'
import { ToastConfig, ToastInput, ToastType, ToastVariant } from '../../../shared-types'

@Injectable({ providedIn: 'root' })
export class ToastService {
  variant = signal<ToastVariant>(ToastType.SUCCESS)
  message = signal<string>('')
  config = signal<ToastConfig>({ duration: 6000, position: 'top', animation: 'slide-out-right' })
  showToastMessage = signal<boolean>(false)

  present(toastInput: ToastInput): void {
    if (toastInput.config) this.config.set(toastInput.config)
    this.setToastSignals(toastInput.variant, toastInput.message, true)
    if (this.config().duration > 0) this.handleToastDuration()
  }

  private handleToastDuration(): void {
    setTimeout(() => {
      this.dismiss()
    }, this.config().duration)
  }

  private setToastSignals(variant: ToastVariant, message: string, showToast: boolean): void {
    this.variant.set(variant)
    this.message.set(message)
    this.showToastMessage.set(showToast)
  }

  dismiss(): void {
    this.setToastSignals(ToastType.SUCCESS, '', false)
  }
}
