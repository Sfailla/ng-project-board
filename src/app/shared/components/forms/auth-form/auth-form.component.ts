import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { AuthService } from '@auth/services'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AuthTitles, AuthUserInput } from '../../../../auth/auth-types'

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form()" (ngSubmit)="submit()">
      <ion-list lines="none">
        @if (!isLogin()) {
          <ion-item color="light">
            <ion-input
              formControlName="username"
              label="Username"
              labelPlacement="floating"
              type="text" />
          </ion-item>
        }
        <ion-item color="light">
          <ion-input
            aria-label="email-input"
            formControlName="email"
            label="Email"
            labelPlacement="floating"
            type="email" />
        </ion-item>

        <ion-item color="light">
          <ion-input
            formControlName="password"
            label="Password"
            labelPlacement="floating"
            type="password" />
        </ion-item>

        @if (!isLogin()) {
          <ion-item color="light">
            <ion-input
              formControlName="confirmPassword"
              label="Confirm Password"
              labelPlacement="floating"
              type="password" />
          </ion-item>
        }
      </ion-list>

      <ion-button
        aria-label="submit-button"
        type="submit"
        expand="block"
        color="primary"
        [disabled]="form().invalid">
        {{ isLogin() ? AuthTitles.LOGIN : AuthTitles.REGISTER }}
      </ion-button>
    </form>
  `,
  styleUrl: 'style.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
  isLogin = input.required<boolean>()
  form = input.required<FormGroup>()

  authService: AuthService = inject(AuthService)
  destroyRef: DestroyRef = inject(DestroyRef)

  AuthTitles: typeof AuthTitles = AuthTitles

  submit() {
    const credentials = <AuthUserInput>this.form().value

    this.isLogin()
      ? this.authService.login(credentials).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
      : this.authService.register(credentials).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }
}
