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
      form {
        & ion-list {
          background-color: var(--ion-color-light);
        }

        & ion-item {
          border: 1px solid var(--form-border-color);
          border-radius: 5px;

          &::part(native) {
            border-style: none;
            padding-left: 16px;

            & .item-inner {
              border: none;
            }
          }

          &:not(:last-of-type) {
            margin-bottom: 1.5rem;
          }
        }

        & ion-button {
          height: 5rem;
          margin-top: 30px;
          font-size: 1.4rem;

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
