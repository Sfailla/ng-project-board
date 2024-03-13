import { Injectable, inject, signal } from '@angular/core'
import { OverlayService } from '../overlay/overlay.service'

@Injectable({ providedIn: 'root' })
export class ModalService {
  overlayService: OverlayService = inject(OverlayService)

  showModal = signal<boolean>(false)
  modalTitle = signal<string>('')
  component = signal<any>(null)

  openModal({ title, component }: { title: string; component: any }): void {
    this.showModal.set(true)
    this.modalTitle.set(title)
    this.component.set(component)
    this.overlayService.present()
  }

  closeModal(): void {
    this.showModal.set(false)
    this.modalTitle.set('')
    this.overlayService.dismiss()
  }
}
