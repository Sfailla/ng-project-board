import { Component } from '@angular/core'
import { AuthComponent } from '../components/auth/auth.component'
import { AuthTitles } from '../types'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent],
  template: `
    <div class="page-container">
      <app-auth [title]="AuthTitles.LOGIN"></app-auth>
    </div>
  `,
  styles: [
    `
      @import '../../styles/abstracts';

      .page-container {
        @include flex();
        background-color: var(--ion-color-primary);
      }
    `
  ]
})
export class LoginComponent {
  AuthTitles: typeof AuthTitles = AuthTitles
}
