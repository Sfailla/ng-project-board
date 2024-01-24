import { Component } from '@angular/core'
import { AuthComponent } from '../components/auth.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent],
  template: `
    <div class="page-container">
      <app-auth title="Sign Into"></app-auth>
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
  // Your code here
}
