import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { OverlayService } from '../../services/overlay/overlay.service'
import { ConfirmationService, ModalService } from '../../services'

@Component({
  selector: 'app-overlay',
  standalone: true,
  template: `
    <ng-container>
      @if (modalService.showModal() || confirmationService.isOpen()) {
        <div class="overlay" (click)="dismissAll()"></div>
      }
    </ng-container>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(70, 70, 70, 0.75);
        z-index: 2;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {
  overlayService: OverlayService = inject(OverlayService)
  confirmationService: ConfirmationService = inject(ConfirmationService)
  modalService: ModalService = inject(ModalService)

  dismissAll() {
    this.confirmationService.dismiss()
    this.modalService.dismiss()
    this.overlayService.dismiss()
  }
}
