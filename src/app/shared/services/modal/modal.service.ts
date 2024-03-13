import { Injectable, inject, signal } from '@angular/core'
import { OverlayService } from '../overlay/overlay.service'

export interface ModalOptions {
  title: string
  component: any
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  overlayService: OverlayService = inject(OverlayService)

  showModal = signal<boolean>(false)
  title = signal<string>('')
  component = signal<any>(null)

  create({ title, component }: ModalOptions): void {
    this.title.set(title)
    this.component.set(component)
  }

  present(): void {
    this.showModal.set(true)
    this.overlayService.present()
  }

  dismiss(): void {
    this.showModal.set(false)
    this.title.set('')
    this.overlayService.dismiss()
  }
}
