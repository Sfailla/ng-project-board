import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

@Component({
  selector: 'auth-component',
  standalone: true,
  imports: [CommonModule, IonicModule],
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
                <a>{{ (isLogin | async) ? 'Sign Up' : 'Sign In' }}</a>
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content class="card__content">
              <form>
                <ion-list lines="none">
                  <ion-item *ngIf="!(isLogin | async)" color="light">
                    <ion-input
                      label="Username"
                      labelPlacement="floating"
                      type="text"
                      formControlName="username"></ion-input>
                  </ion-item>
                  <ion-item color="light">
                    <ion-input
                      label="Email"
                      labelPlacement="floating"
                      type="email"
                      formControlName="email"></ion-input>
                  </ion-item>
                  <ion-item color="light">
                    <ion-input
                      label="Password"
                      labelPlacement="floating"
                      type="password"
                      formControlName="password"></ion-input>
                  </ion-item>
                  <ion-item *ngIf="!(isLogin | async)" color="light">
                    <ion-input
                      label="Confirm Password"
                      labelPlacement="floating"
                      type="password"
                      formControlName="confirmPassword"></ion-input>
                  </ion-item>
                </ion-list>
                <ion-button type="submit" expand="block" color="primary">
                  {{ isLogin ? 'Sign In' : 'Sign Up' }}
                </ion-button>
              </form>

              <div class="login__content-break">or</div>

              <div class="login__socials">
                <a class="circle-link">
                  <ion-icon name="logo-google"></ion-icon>
                </a>
                <a class="circle-link">
                  <ion-icon name="logo-github"></ion-icon>
                </a>
                <a class="circle-link">
                  <ion-icon name="logo-apple"></ion-icon>
                </a>
              </div>
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
export class AuthComponent {
  @Input()
  title!: string

  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor() {}

  ngOnInit() {
    this.isLogin.next(this.title === 'Sign Into')
    console.log({ title: this.title, boolean: this.title === 'Sign Into' })
  }
}
