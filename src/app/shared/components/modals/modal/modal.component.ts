import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { ModalService } from '../../../services'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ng-container>
      @if (modalService.showModal()) {
        <ion-card class="modal">
          <ion-card-header class="modal__header">
            <h2 class="modal__title">{{ modalService.modalTitle() }}</h2>
            <ion-button size="small" class="modal__close-button">
              <ion-icon slot="icon-only" size="large" name="close" />
            </ion-button>
          </ion-card-header>
          <ion-card-content class="modal__content">
            <ng-container *ngComponentOutlet="Component()" />
          </ion-card-content>
        </ion-card>
      }
    </ng-container>
  `,
  styles: [
    `
      .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #1e1f21;
        width: 560px;
        height: 518px;
        border-radius: 12px;
        z-index: 3;
      }

      ion-card-header {
        padding: 0 24px;
        height: 64px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #424244;

        & h2 {
          font-size: 2rem;
          color: var(--heading-color-primary);
        }
      }

      ion-button {
        width: 25px;
        height: 25px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  modalService: ModalService = inject(ModalService)

  Component = this.modalService.component
}
