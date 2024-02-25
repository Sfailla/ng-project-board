import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { ToastService } from '../../services/toast/toast.service'

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ng-container>
      @if (toastService.showToastMessage()) {
        <ion-card
          class="
            toast
            toast-variant--{{ toastService.variant() }}
            toast-position--{{ toastService.config().position }}
            toast-animation--{{ toastService.config().animation }}
          ">
          <div class="toast__container">
            <div class="toast__content">
              <ion-icon name="checkmark-circle-outline" />
              <div class="toast__text-container">
                <h3>{{ toastService.variant() }}</h3>
                <p>{{ toastService.message() }}</p>
              </div>
            </div>
            <div class="toast__close">
              <ion-button slot="icon-only" size="small" (click)="closeToastMessage()">
                <ion-icon name="close" size="medium" />
              </ion-button>
            </div>
          </div>
        </ion-card>
      }
    </ng-container>
  `,
  styleUrl: './toast-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastMessageComponent {
  toastService: ToastService = inject(ToastService)

  closeToastMessage(): void {
    this.toastService.clearToastMessages()
  }
}
