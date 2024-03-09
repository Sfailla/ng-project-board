import { Injectable, signal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class OverlayService {
  showOverlay = signal<boolean>(false)

  present() {
    this.showOverlay.set(true)
  }

  dismiss() {
    this.showOverlay.set(false)
  }
}
