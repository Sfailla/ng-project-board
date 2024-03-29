import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { AuthTitles, AuthUserInput, RedirectTitles } from '../../auth-types'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { SocialsComponent } from '../socials/socials.component'
import { Subscription } from 'rxjs/internal/Subscription'
import { RouterLink } from '@angular/router'
import { Routes } from '../../../shared-types'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterLink, IonicModule, ReactiveFormsModule, SocialsComponent],
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
                <a [routerLink]="isLogin() ? Routes.REGISTER : Routes.LOGIN">
                  {{ isLogin() ? RedirectTitles.SIGN_UP : RedirectTitles.SIGN_IN }}
                </a>
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
export class AuthComponent implements OnInit, OnDestroy {
  @Input()
  title!: string
  // services
  authService: AuthService = inject(AuthService)
  // state
  isLogin: WritableSignal<boolean> = signal(false)
  // variables
  AuthTitles: typeof AuthTitles = AuthTitles
  RedirectTitles: typeof RedirectTitles = RedirectTitles
  Routes: typeof Routes = Routes
  authForm = new FormGroup({
    username: new FormControl('', Validators.min(4)),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(4)]),
    confirmPassword: new FormControl('', Validators.min(4))
  })
  subSink: Subscription = new Subscription()

  ngOnInit(): void {
    this.isLogin.set(this.title === AuthTitles.LOGIN)
  }

  submit() {
    const credentials = this.authForm.value as AuthUserInput
    this.isLogin()
      ? this.subSink.add(this.authService.login(credentials).subscribe())
      : this.subSink.add(this.authService.register(credentials).subscribe())
  }

  ngOnDestroy(): void {
    this.authForm.reset()
    this.subSink.unsubscribe()
  }
}
