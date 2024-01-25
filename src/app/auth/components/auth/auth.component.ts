import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { AuthTitles, AuthUserInput, RedirectTitles } from '../../types'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { SocialsComponent } from '../socials/socials.component'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, SocialsComponent],
  template: `
    <ion-grid>
      <ion-row>
        <ion-col></ion-col>
        <ion-col>
          <ion-card class="card" color="light">
            <ion-card-header class="card__header">
              <ion-card-title class="card__title">
                <ion-text class="card__title--text">{{ title }} Project Board</ion-text>
              </ion-card-title>
              <ion-card-subtitle class="card__subtitle">
                <ion-text class="card__subtitle--text">already have an account?</ion-text>
                <a>{{ isLogin() ? RedirectTitles.SIGN_IN : RedirectTitles.SIGN_UP }}</a>
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content class="card__content">
              <form [formGroup]="authForm">
                <ion-list lines="none">
                  <ion-item *ngIf="!isLogin()" color="light">
                    <ion-input
                      formControlName="username"
                      label="Username"
                      labelPlacement="floating"
                      type="text"></ion-input>
                  </ion-item>
                  <ion-item color="light">
                    <ion-input
                      formControlName="email"
                      label="Email"
                      labelPlacement="floating"
                      type="email"></ion-input>
                  </ion-item>
                  <ion-item color="light">
                    <ion-input
                      formControlName="password"
                      label="Password"
                      labelPlacement="floating"
                      type="password"></ion-input>
                  </ion-item>
                  <ion-item *ngIf="!isLogin()" color="light">
                    <ion-input
                      formControlName="confirmPassword"
                      label="Confirm Password"
                      labelPlacement="floating"
                      type="password"></ion-input>
                  </ion-item>
                </ion-list>
                <ion-button type="submit" expand="block" color="primary" (click)="submit()">
                  {{ isLogin() ? AuthTitles.LOGIN : AuthTitles.REGISTER }}
                </ion-button>
              </form>
              <div class="login__content-break">or</div>
              <app-socials></app-socials>
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col></ion-col>
      </ion-row>
      <ion-row></ion-row>
    </ion-grid>
  `,
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  @Input()
  title!: string
  // services
  authService: AuthService = inject(AuthService)
  // state
  isLogin: WritableSignal<boolean> = signal(false)
  // variables
  AuthTitles: typeof AuthTitles = AuthTitles
  RedirectTitles: typeof RedirectTitles = RedirectTitles
  authForm = new FormGroup({
    username: new FormControl('', Validators.min(4)),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(4)]),
    confirmPassword: new FormControl('', Validators.min(4))
  })

  ngOnInit(): void {
    this.isLogin.set(this.title === AuthTitles.LOGIN)
  }

  submit(): void {
    const credentials = this.authForm.value as AuthUserInput
    this.isLogin() ? this.authService.login(credentials) : this.authService.register(credentials)
  }
}
