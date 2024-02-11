import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { AuthComponent } from '../components/auth/auth.component'
import { AuthTitles } from '../auth-types'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, AuthComponent],
  template: `
    <div class="page-container">
      <app-auth [title]="AuthTitles.REGISTER"></app-auth>
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
export class RegisterComponent {
  AuthTitles: typeof AuthTitles = AuthTitles
}
