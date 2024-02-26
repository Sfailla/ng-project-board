import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AuthComponent } from '../components/auth/auth.component'
import { AuthTitles } from '../auth-types'
import { PageWrapperComponent, ToastMessageComponent } from '../../shared/components'

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
      @use '../../styles/abstracts' as *;

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
}
