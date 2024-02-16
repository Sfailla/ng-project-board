import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-card class="toast" [style.display]="showToastMessage() ? 'block' : 'none'">
      <div class="toast__container">
        <div class="toast__content">
          <ion-icon name="checkmark-circle-outline"></ion-icon>
          <div class="toast__text-container">
            <h3>Success</h3>
            <p>{{ message() }}</p>
          </div>
        </div>
        <div class="toast__close">
          <ion-button slot="icon-only" size="small" (click)="closeToastMessage()">
            <ion-icon name="close" size="medium"></ion-icon>
          </ion-button>
        </div>
      </div>
    </ion-card>
  `,
  styles: [
    `
      .toast {
        width: 100%;
        max-width: 60rem;
        height: auto;
        position: absolute;
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--ion-color-light);
        color: var(--ion-color-light);
        padding: 1rem;
        border-radius: 0.5rem;
        animation: slideUp 0.5s ease-in-out forwards;

        &::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 100%;
          left: 0;
          top: 0;
          background-color: var(--ion-color-success);
        }

        &__container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        &__content {
          display: flex;
          align-items: center;
          padding-left: 10px;
          gap: 1rem;

          ion-icon {
            font-size: 2rem;
            color: var(--ion-color-success);
          }
        }

        &__text-container {
          h3 {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0;
            padding-bottom: 2px;
            color: var(--heading-color-primary);
          }

          p {
            color: #a4a4a4;
            font-size: 1.2rem;
          }
        }

        &__close {
          ion-button {
            height: 30px;
            --background: var(--ion-color-success);
          }
          ion-icon {
            font-size: 1.5rem;
            color: black;
            cursor: pointer;
          }
        }
      }

      @keyframes slideUp {
        from {
          bottom: -2rem;
          opacity: 0;
          visibility: hidden;
        }

        to {
          bottom: 2rem;
          opacity: 1;
          visibility: visible;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastMessageComponent {
  message = input<string>()
  variant = input<string>()
  showToastMessage = signal<boolean>(true)

  constructor() {
    effect(() => {
      console.log(this.message())
      console.log({ showToast: this.showToastMessage() })
    })
  }

  closeToastMessage(): void {
    this.showToastMessage.set(false)
  }
}
