import { Injectable, signal } from '@angular/core'

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
  isOpen = signal<boolean>(false)

  confirmation = signal<ConfirmationOptions>({
    buttons: [],
    header: '',
    message: ''
  })

  create({ header, message, buttons, onSuccess }: ConfirmationOptions) {
    const cancelButton = { text: 'Cancel', role: 'cancel', handler: () => this.isOpen.set(false) }
    const confirmButton = {
      text: 'Confirm',
      role: 'submit',
      handler: () => {
        if (onSuccess) onSuccess()
        this.isOpen.set(false)
      }
    }
    const defaultButtons = [cancelButton, confirmButton]
    this.confirmation.set({ header, message, buttons: buttons || defaultButtons })
  }

  present() {
    this.isOpen.set(true)
  }

  dismiss() {
    this.confirmation.set({ buttons: [], header: '', message: '' })
    this.isOpen.set(false)
  }
}
