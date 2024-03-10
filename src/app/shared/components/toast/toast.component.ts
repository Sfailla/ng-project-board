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
            toast-variant--{{ toastService.toast().variant }}
            toast-position--{{ toastService.toast().config?.position }}
            toast-animation--{{ toastService.toast().config?.animation }}
          ">
          <div class="toast__container">
            <div class="toast__content">
              <ion-icon name="checkmark-circle-outline" />
              <div class="toast__text-container">
                <h3>{{ toastService.toast().variant }}</h3>
                <p>{{ toastService.toast().message }}</p>
              </div>
            </div>
            <div class="toast__close">
              <ion-button slot="icon-only" size="small" (click)="dismissToast()">
                <ion-icon name="close" size="medium" />
              </ion-button>
            </div>
          </div>
        </ion-card>
      }
    </ng-container>
  `,
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  toastService: ToastService = inject(ToastService)

  dismissToast(): void {
    this.toastService.dismiss()
  }
}
