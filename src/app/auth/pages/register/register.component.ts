import { Component } from '@angular/core'
import { AuthTitles } from '../../auth-types'
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component'
import { AuthComponent } from '../../components'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent, PageWrapperComponent],
  template: `
    <app-page-wrapper class="register">
      <app-auth [title]="AuthTitles.REGISTER"></app-auth>
    </app-page-wrapper>
  `,
  styles: [
    `
      @use '../../../styles/abstracts' as *;

      .register {
        @include flex();
        background-color: var(--ion-color-primary);
      }
    `
  ]
})
export class RegisterComponent {
  AuthTitles: typeof AuthTitles = AuthTitles
}
