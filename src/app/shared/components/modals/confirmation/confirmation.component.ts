import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { ConfirmationService } from '../../../services/confirmation/confirmation.service'

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ng-container>
      @if (confirmationService.isOpen()) {
        <ion-card class="confirmation">
          <ion-card-header class="confirmation__header">
            <h2>{{ confirmationService.header() }}</h2>
          </ion-card-header>
          <ion-card-content class="confirmation__content">
            <p>{{ confirmationService.message() }}</p>
          </ion-card-content>
          <ion-buttons class="confirmation__buttons">
            @for (button of confirmationService.buttons(); track button.text) {
              <ion-button (click)="button?.handler()">
                {{ button.text }}
              </ion-button>
            }
          </ion-buttons>
        </ion-card>
      }
    </ng-container>
  `,
  styles: [
    `
      .confirmation {
        padding: 1.6rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        border: 1px solid #323232;

        &__header {
          & h2 {
            color: var(--ion-color-primary);
            font-size: 1.6rem;
          }
        }

        &__content {
          & p {
            font-size: 1.4rem;
          }
        }

        &__buttons {
          justify-content: flex-end;

          & ion-button {
            --color: var(--ion-color-primary);
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent {
  confirmationService = inject(ConfirmationService)
}
