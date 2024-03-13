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
            <h2 class="modal__title">{{ modalService.title() }}</h2>
            <ion-button size="small" class="modal__close-button" (click)="modalService.dismiss()">
              <ion-icon slot="icon-only" size="small" name="close" />
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
      @use '../../../../styles/abstracts' as *;

      .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #1e1f21;
        width: rem(560px);
        height: rem(518px);
        border-radius: rem(12px);
        border: 1px solid #323232;
        z-index: 3;
      }

      ion-card-header {
        padding: 0 rem(24px);
        height: rem(64px);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #424244;

        & h2 {
          font-size: rem(20px);
          color: var(--heading-color-primary);
        }
      }

      ion-button {
        width: rem(30px);
        height: rem(25px);

        &::part(native) {
          padding: rem(6px);
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  modalService: ModalService = inject(ModalService)

  Component = this.modalService.component
}
