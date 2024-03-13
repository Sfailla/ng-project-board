import { Component, DestroyRef, inject } from '@angular/core'
import { AuthService } from '../../../auth/services/auth.service'
import { IonicModule } from '@ionic/angular'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-menu class="settings-menu" side="end" type="overlay" menuId="settings" contentId="main">
      <ion-header>
        <ion-toolbar color="danger">
          <ion-title>Settings Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item lines="full">
            <ion-icon slot="start" name="options-outline" />
            <ion-label>Settings</ion-label>
          </ion-item>
          <ion-item (click)="logout()" lines="full">
            <ion-icon slot="start" name="log-out-outline" />
            <ion-label>Logout</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  `,
  styles: [
    `
      @use '../../../styles/abstracts' as *;

      .settings-menu {
        --width: rem(250px);
        z-index: 1;

        &:focus-visible {
          outline: none;
        }

        & ion-header {
          --background: var(--dashboard-sub-background);
          height: rem(60px);

          & ion-toolbar {
            height: rem(60px);
          }
        }

        & ion-content {
          --background: var(--dashboard-sub-background);
          border-left: 1px solid var(--dashboard-border-color);

          & ion-list {
            padding: 0;
            background: var(--dashboard-sub-background);

            & ion-item {
              --background: var(--dashboard-sub-background);
              font-size: rem(14px);
              font-weight: bold;
              letter-spacing: rem(0.5px);
              color: var(--ion-color-medium-shade);
              text-transform: uppercase;
              cursor: pointer;
              border-bottom: 1px solid var(--dashboard-border-color);

              &::part(native) {
                height: rem(59px);
              }

              &:first-child {
                border-top: 1px solid var(--dashboard-border-color);
              }

              &:hover {
                & ion-icon,
                & ion-label {
                  color: var(--ion-color-primary);
                }
              }

              & ion-label {
                margin-left: rem(5px);
              }

              & ion-icon {
                font-size: rem(24px);
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
  destroyRef: DestroyRef = inject(DestroyRef)

  logout() {
    this.authService.logout().pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }
}
