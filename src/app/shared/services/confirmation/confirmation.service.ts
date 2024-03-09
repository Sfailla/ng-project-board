import { Injectable, inject, signal } from '@angular/core'
import { OverlayService } from '../overlay/overlay.service'

export interface ConfirmationOptions {
  header: string
  message: string
  buttons?: Button[]
  cssClass?: string
  onSuccess?: () => void
}

export interface Button {
  text: string
  role?: string
  handler?: () => void
}

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  overlayService: OverlayService = inject(OverlayService)

  isOpen = signal<boolean>(false)
  buttons = signal<Button[]>([])
  header = signal<string>('')
  message = signal<string>('')

  create({ header, message, buttons, onSuccess }: ConfirmationOptions) {
    const defaultButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel')
          this.isOpen.set(false)
          this.overlayService.dismiss()
        }
      },
      {
        text: 'Confirm',
        role: 'submit',
        handler: () => {
          console.log('confirm')
          if (onSuccess) onSuccess()
          this.isOpen.set(false)
          this.overlayService.dismiss()
        }
      }
    ]

    this.header.set(header)
    this.message.set(message)
    this.buttons.set(buttons || defaultButtons)
  }

  present() {
    this.isOpen.set(true)
    this.overlayService.present()
  }

  dismiss() {
    this.header.set('')
    this.message.set('')
    this.buttons.set([])
    this.isOpen.set(false)
  }
}
