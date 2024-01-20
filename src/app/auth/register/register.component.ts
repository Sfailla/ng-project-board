import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { AuthComponent } from '../shared/auth.component'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, AuthComponent],
  template: `
    <div class="page-container">
      <auth-component title="Sign Up For"></auth-component>
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
export class RegisterComponent {}
