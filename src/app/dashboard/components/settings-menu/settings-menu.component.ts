import { Component, inject } from '@angular/core'
import { AuthService } from '../../../auth/services/auth.service'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-menu class="settings-menu" side="end" type="overlay" menuId="settings" contentId="main">
      <ion-header>
        <ion-toolbar color="danger">
          <ion-title>End Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item lines="full">
            <ion-icon slot="start" name="options-outline"></ion-icon>
            <ion-label>Settings</ion-label>
          </ion-item>
          <ion-item (click)="logout()" lines="full">
            <ion-icon slot="start" name="log-out-outline"></ion-icon>
            <ion-label>Logout</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  `,
  styles: [
    `
      @import '../../../styles/abstracts';

      .settings-menu {
        --width: 20rem;
        z-index: 1;

        &:focus-visible {
          outline: none;
        }

        & ion-content {
          border-left: $primary-border;

          & ion-list {
            padding: 0;

            & ion-item {
              padding: 0.5rem 1rem;
              font-size: 14px;
              font-weight: bold;
              letter-spacing: 0.5px;
              color: var(--ion-color-medium-shade);
              text-transform: uppercase;
              cursor: pointer;

              &:hover {
                & ion-icon,
                & ion-label {
                  color: var(--ion-color-danger);
                }
              }

              & ion-label {
                margin-left: 0.5rem;
              }

              & ion-icon {
                font-size: 2.4rem;
              }
            }
          }
        }
      }
    `
  ]
})
export class SettingsMenuComponent {
  authService: AuthService = inject(AuthService)

  logout() {
    this.authService.logout()
  }
}
