import { Injectable, signal } from '@angular/core'
import { ToastConfig, ToastInput, ToastTypes, ToastVariant } from '../../../shared-types'

@Injectable({ providedIn: 'root' })
export class ToastService {
  variant = signal<ToastVariant>(ToastTypes.SUCCESS)
  message = signal<string>('')
  config = signal<ToastConfig>({ duration: 6000, position: 'top', animation: 'slide-out-right' })
  showToastMessage = signal<boolean>(false)

  setToastMessage(toastInput: ToastInput): void {
    if (toastInput.config) this.config.set(toastInput.config)
    this.setToastSignals(toastInput.variant, toastInput.message, true)
    if (this.config().duration > 0) this.handleToastDuration()
  }

  handleToastDuration(): void {
    setTimeout(() => {
      this.clearToastMessages()
    }, this.config().duration)
  }

  setToastSignals(variant: ToastVariant, message: string, showToast: boolean): void {
    this.variant.set(variant)
    this.message.set(message)
    this.showToastMessage.set(showToast)
  }

  clearToastMessages(): void {
    this.setToastSignals(ToastTypes.SUCCESS, '', false)
  }
}
