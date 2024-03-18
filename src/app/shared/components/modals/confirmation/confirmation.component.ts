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
            <h2>{{ confirmationService.confirmation().header }}</h2>
          </ion-card-header>
          <ion-card-content class="confirmation__content">
            <p>{{ confirmationService.confirmation().message }}</p>
          </ion-card-content>
          <ion-buttons class="confirmation__buttons">
            @for (button of confirmationService.confirmation().buttons; track button.text) {
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
      @use '../../../../styles/abstracts' as *;

      .confirmation {
        padding: rem(16px);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        border: 1px solid #323232;

        &__header {
          & h2 {
            color: var(--ion-color-primary);
            font-size: rem(16px);
            margin-bottom: rem(18px);
          }
        }

        &__content {
          & p {
            font-size: rem(14px);
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
