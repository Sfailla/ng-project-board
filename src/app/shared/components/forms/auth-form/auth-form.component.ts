import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { AuthTitles } from '../../../../auth/auth-types'

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form()">
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
          <ion-input formControlName="email" label="Email" labelPlacement="floating" type="email" />
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
        type="submit"
        expand="block"
        color="primary"
        (click)="submit()()"
        [disabled]="!form().valid">
        {{ isLogin() ? AuthTitles.LOGIN : AuthTitles.REGISTER }}
      </ion-button>
    </form>
  `,
  styles: [
    `
      @use '../../../../styles/abstracts' as *;

      form {
        & ion-list {
          background-color: var(--ion-color-light);
        }

        & ion-item {
          border: 1px solid var(--form-border-color);
          border-radius: rem(5px);
          height: rem(50px);

          &:not(:last-of-type) {
            margin-bottom: rem(15px);
          }

          & ion-input {
            font-size: rem(13px);
            transform: translateY(-2px) scaleY(0.9);

            & input {
              padding-bottom: rem(6px);
            }
          }
        }

        & ion-button {
          height: rem(50px);
          margin-top: rem(30px);
          font-size: rem(14px);

          &:disabled {
            opacity: 0.5;

            &::after {
              display: none;
            }
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
  isLogin = input.required<boolean>()
  form = input.required<FormGroup>()
  submit = input.required<() => void>()

  AuthTitles: typeof AuthTitles = AuthTitles
}
