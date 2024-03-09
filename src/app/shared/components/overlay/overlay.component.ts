import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { OverlayService } from '../../services/overlay/overlay.service'
import { ConfirmationService } from '../../services/confirmation/confirmation.service'

@Component({
  selector: 'app-overlay',
  standalone: true,
  template: `
    <ng-container>
      @if (overlayService.showOverlay()) {
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
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {
  overlayService: OverlayService = inject(OverlayService)
  confirmationService: ConfirmationService = inject(ConfirmationService)

  dismissAll() {
    this.overlayService.dismiss()
    this.confirmationService.dismiss()
  }
}
