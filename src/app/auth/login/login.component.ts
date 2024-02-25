import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'
import { AuthComponent } from '../components/auth/auth.component'
import { AuthTitles } from '../auth-types'
import { ActivatedRoute } from '@angular/router'
import { PageWrapperComponent, ToastMessageComponent } from '../../shared/components'
import { ToastService } from '../../shared/services/toast/toast.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, PageWrapperComponent, ToastMessageComponent],
  template: `
    <app-page-wrapper class="login">
      <app-auth [title]="AuthTitles.LOGIN"></app-auth>
    </app-page-wrapper>
  `,
  styles: [
    `
      @import '../../styles/abstracts';

      .login {
        @include flex();
        background-color: var(--ion-color-primary);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  AuthTitles: typeof AuthTitles = AuthTitles
  route = inject(ActivatedRoute)
  toastService: ToastService = inject(ToastService)
}
