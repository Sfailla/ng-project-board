import { Component, OnInit, inject } from '@angular/core'
import { AuthComponent } from '../components/auth/auth.component'
import { AuthTitles } from '../types'
import { ActivatedRoute } from '@angular/router'

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
export class LoginComponent implements OnInit {
  AuthTitles: typeof AuthTitles = AuthTitles
  route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log({ message: params['message'], params })
    })
  }
}
