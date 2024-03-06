import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { AuthTitles, AuthUserInput, RedirectTitles } from '../../auth-types'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { SocialsComponent } from '../socials/socials.component'
import { RouterLink } from '@angular/router'
import { Routes } from '../../../shared-types'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AuthFormComponent } from '../../../shared/components'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterLink, IonicModule, SocialsComponent, AuthFormComponent],
  template: `
    <ion-grid>
      <ion-row>
        <ion-col />
        <ion-col>
          <ion-card class="card" color="light">
            <ion-card-header class="card__header">
              <ion-card-title class="card__title">
                <ion-text class="card__title--text">{{ title() }} Project Board</ion-text>
              </ion-card-title>
              <ion-card-subtitle class="card__subtitle">
                <ion-text class="card__subtitle--text">already have an account?</ion-text>
                <a [routerLink]="isLogin() ? Routes.REGISTER : Routes.LOGIN">
                  {{ isLogin() ? RedirectTitles.SIGN_UP : RedirectTitles.SIGN_IN }}
                </a>
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content class="card__content">
              <app-auth-form [isLogin]="isLogin()" [form]="authForm" [submit]="submit" />
              <div class="login__content-break">or</div>
              <app-socials />
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col />
      </ion-row>
      <ion-row />
    </ion-grid>
  `,
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {
  title = input.required<string>()
  // services
  authService: AuthService = inject(AuthService)
  destroyRef: DestroyRef = inject(DestroyRef)
  // state
  isLogin = signal<boolean>(false)
  // variables
  AuthTitles: typeof AuthTitles = AuthTitles
  RedirectTitles: typeof RedirectTitles = RedirectTitles
  Routes: typeof Routes = Routes
  // form
  authForm = new FormGroup({
    username: new FormControl('', Validators.min(4)),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(4)]),
    confirmPassword: new FormControl('', Validators.min(4))
  })

  ngOnInit(): void {
    this.isLogin.set(this.title() === AuthTitles.LOGIN)
  }

  submit = () => {
    const credentials = this.authForm.value as AuthUserInput
    this.isLogin()
      ? this.authService.login(credentials).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
      : this.authService.register(credentials).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  ngOnDestroy(): void {
    this.authForm.reset()
  }
}
