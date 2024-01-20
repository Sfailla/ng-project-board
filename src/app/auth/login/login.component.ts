import { Component } from '@angular/core'
import { AuthComponent } from '../shared/auth.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent],
  template: `
    <div class="page-container">
      <auth-component title="Sign Into"></auth-component>
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
