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
import { AuthTitles } from '../../auth-types'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '@auth/services'
import { SocialsComponent } from '../socials/socials.component'
import { RouterLink } from '@angular/router'
import { Routes } from '@shared/types'
import { AuthFormComponent } from '@shared/components'

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
                <ion-text class="card__subtitle--text">
                  {{ isLogin() ? AuthTitles.LOGIN_SUBTITLE : AuthTitles.REGISTER_SUBTITLE }}
                </ion-text>
                <a [routerLink]="isLogin() ? Routes.REGISTER : Routes.LOGIN">
                  {{ isLogin() ? AuthTitles.SIGN_UP : AuthTitles.SIGN_IN }}
                </a>
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content class="card__content">
              <app-auth-form [isLogin]="isLogin()" [form]="authForm" />
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

  ngOnDestroy(): void {
    this.authForm.reset()
  }
}
