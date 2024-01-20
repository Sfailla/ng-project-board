import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="page-container">
      <ion-grid>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <ion-card class="card" color="light">
              <ion-card-header class="card__header">
                <ion-card-title class="card__title">
                  <ion-text class="card__title--text">Sign up for Project Board</ion-text>
                </ion-card-title>
                <ion-card-subtitle class="card__subtitle">
                  <ion-text class="card__subtitle--text">already have an account?</ion-text>
                  <a>Sign in</a>
                </ion-card-subtitle>
              </ion-card-header>
              <ion-card-content class="card__content">
                <form>
                  <ion-list lines="none">
                    <ion-item color="light">
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
                    <ion-item color="light">
                      <ion-input
                        label="Confirm Password"
                        labelPlacement="floating"
                        type="password"
                        formControlName="confirmPassword"></ion-input>
                    </ion-item>
                  </ion-list>
                  <ion-button type="submit" expand="block" color="primary">
                    Create account
                  </ion-button>
                </form>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row></ion-row>
      </ion-grid>
    </div>
  `,
  styles: [
    `
      @import '../../styles/abstracts/mixins.scss';
      @import '../../styles/abstracts/variables.scss';

      .page-container {
        @include flex();
        background-color: var(--ion-color-primary);
      }

      .card {
        width: 40rem;
        padding: 10px;
        border-radius: 5px;

        &__header {
          width: 100%;
          margin-bottom: 3rem;
          padding: 1.6rem 1.6rem 0 1.6rem;
        }

        &__title {
          font-size: 2.4rem;
          font-weight: 600;
          font-family: montserrat;

          &--text {
            color: var(--heading-color-primary);
          }
        }

        &__subtitle {
          font-size: 1.4rem;
          line-height: 2.5;

          &--text {
            color: #a4a4a4;
          }

          & a {
            cursor: pointer;
            padding-left: 0.5rem;
          }
        }

        &__content {
          & form {
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
        }
      }
    `
  ]
})
export class RegisterComponent {}
